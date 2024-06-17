<template>
  <v-table class="items" density="compact">
    <thead>
      <tr @click="()=>{expand_all = !expand_all}">
        <td>
              <v-label>{{ label }}</v-label>
        </td>
        <td></td>
        <td style="text-align: right;">
          <v-btn class="items" flat icon small v-model="expand_all">
            <v-icon>{{ expand_all_icon }}</v-icon>
          </v-btn>

        </td>
      </tr>
    </thead>
    <tbody>
      <template  v-for="(it, ii) in items" :key="`vitem.${it.key || ii}`">
        <!-- upper row -->
        <tr @click="toggle_expand(ii)">
          <th>
            <v-icon>
              {{ it.required ? 'mdi-exclamation' : 'mdi-blank' }}
            </v-icon>
            {{  it.key }}
          </th>
          <td v-if="it.inherits">
            <v-breadcrumbs :items="it.inherits" />
          </td>
          <td class="flex-fill">
            <v-text-field :model-value="it.title" v-bind="$thx.field"
              single-line hide-details placeholder="summary" readonly
              :append-icon="$thx.expanding_icon(expended[it.key])"
              min-width="5vw" />
          </td>
        </tr>
        <tr v-show="expended[ii]">
          <td colspan="3">
            <v-row>
              <v-col>
                <v-sheet flat class="items ml-1 border-s pl-1 pt-1">
                  <v-text-field v-show="it.defaults" :model-value="it.defaults" v-bind="$thx.field"
                    hide-details readonly
                    placeholder="defaults"
                    :title="it.defaults" />
                  <v-textarea :model-value="it.misc" v-bind="$thx.field"
                    hide-details readonly
                    placeholder="description"
                    :title="it.misc" />
                </v-sheet>
              </v-col>
              <v-col v-if="it.basis.is_object">
                <!-- nested items -->
                <v-list>
                  <tree-items :model-value="it.items" :children="item_children">
                    <template #row="{ item }">
                      <div class="d-inline-flex">
                        <strong>{{ item.key }}</strong>
                        <v-breadcrumbs :items="item.inherits" />
                        <i>:{{ item.title }}</i>
                      </div>
                    </template>
                  </tree-items>
                </v-list>
              </v-col>
            </v-row>
          </td>
        </tr>
      </template>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="2">&nbsp;</td>
      </tr>
    </tfoot>
  </v-table>
</template>
<script>
import treeItems from './treeItems.vue';
import DataType from '@/models/datatype';
// import viewItems from './items.vue';
export default {
  name: 'objectItemsView',
  components: {
    // viewItems,
    treeItems,
  },
  methods: {
    toggle_expand(ii) {
      this.expended[ii] = !this.expended[ii];
    },
    // item_children(it) {
    //   const basis = DataType.find(it.datatype, true);
    //   // close if not object
    //   if(!basis.is_object) { return null; }

    //   return {
    //     key: it.key,
    //     datatype: basis.basistype,
    //     inherits: basis.inherits,
    //     title: basis.summary,
    //   }
    // }
  },
  props: {
    modelValue: Array,
    expending: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: ()=>'properties' 
    },
  },
  computed: {
    items() {
      return this.modelValue.map((it) => {
        const basis = DataType.find(it.datatype, true);
        return {
          ...it,
          inherits: basis.inherits,
          basis: basis,
          items: basis.items,
          origin: basis.basistype || basis.origintype,
          title: basis.summary,
          misc: basis.desc,
          expandable: basis.is_collective,
        }
      });
    },
    expand_all: {
      get() {
        return this.expended.every((it) => it==true);
      },
      set(value) {
        this.expended = this.expended.map(() => value);
      }
    },
    expand_all_icon() {
      return this.expand_all ? 'mdi-chevron-up' : 'mdi-chevron-down';
    },
  },
  data() {
    return {
      expended: this.modelValue.map(() => this.expending),
    }
  },
}
</script>
<style scope>
.items {
  background-color: inherit;
  color: inherit;
}
</style>