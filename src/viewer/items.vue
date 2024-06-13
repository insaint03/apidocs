<template>
  <!-- mode enum/array -->
  <v-list class="items" v-if="!mode_object">
    <v-list-subheader>{{ label }}</v-list-subheader>
    <v-list-item v-for="(it, ii) in items" :key="`vitem.${it || ii}`">
      <v-list-item-title>{{ it }}</v-list-item-title>
      <v-list-item-subtitle v-if="mode_array">
        <v-breadcrumbs :items="Datatype.find(it).inherits" />
      </v-list-item-subtitle>
    </v-list-item>
  </v-list>
  <!-- mode objective -->
  <v-table class="items" v-else-if="datatype.origintype==='object'">
    <thead>
      <tr class="d-flex flex-fill">
        <td colspan="2" class="d-inline-flex flex-fill justify-between">
          <v-label>{{ label }}</v-label>
          <v-spacer />
          <v-btn class="items" flat icon small v-model="expand_all" @click="()=>{expand_all = !expand_all}">
            <v-icon>{{ expand_all_icon }}</v-icon>
          </v-btn>
        </td>
      </tr>
    </thead>
    <tbody>
      <template  v-for="(it, ii) in items" :key="`vitem.${it.key || ii}`">
        <!-- upper row -->
        <tr @click="toggle_expand(it)" class="d-flex align-self-stretch">
          <td class="d-inline-flex justify-around align-center">
            <v-text-field :model-value="it.key" v-bind="$thx.field"
              single-line hide-details readonly
              :title="it.key"
              :append-inner-icon="it.required ? 'mdi-exclamation' : 'mdi-blank'" />
            <v-breadcrumbs :items="it.inherits" />
          </td>
          <td class="d-inline-flex flex-fill align-center">
            <v-text-field :model-value="it.title" v-bind="$thx.field"
              single-line hide-details placeholder="summary" readonly
              :append-icon="$thx.expanding_icon(expended[it.key])" />
          </td>
        </tr>
        <tr v-show="expended[it.key]">
          <td colspan="2">
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
import Datatype from '@/models/datatype';
export default {
  name: 'objectItems',
  methods: {
    toggle_expand(it) {
      this.expended[it.key] = !this.expended[it.key];
    },
  },
  props: {
    modelValue: String,
    label: {
      type: String,
      default: ()=>'properties' 
    },
  },
  computed: {
    datatype() {
      return Datatype.find(this.value, true);
    },
    mode_enum() {
      return this.datatype.origintype === 'enum';
    },
    mode_array() {
      return this.datatype.origintype=== 'array';
    },
    mode_object() {
      return this.datatype.origintype === 'object';
    },
    items() {
      return this.mode_object ? this.datatype.items.map((it) => {
          const basis = Datatype.find(it.datatype, true);
          return {
            ...it,
            inherits: basis.inherits,
            basis: basis,
            items: basis.items,
            origin: basis.basistype || basis.origintype,
            title: basis.summary,
            misc: basis.description,
            expandable: basis.is_collective,
          }
      }) : this.datatype.items;
    },
    expand_all: {
      get() {
        const expanded_length = Object.keys(this.expended).length;
        if(this.value.length === expanded_length) {
          return true;
        } else if(expanded_length === 0) {
          return false;
        } else {
          return null;
        }
      },
      set(v) {
        if(v) {
          this.items
            .filter((it)=>this.expended[it.key]==null)
            .forEach((it)=>this.expended[it.key] = true);
        } else {
          this.expended = {};
        }
      }
    },
    expand_all_icon() {
      switch(this.expand_all) {
        case true: return 'mdi-chevron-up';
        case false: return 'mdi-chevron-down';
        default: return 'mdi-chevron-right';
      
      }
    }
  },
  data() {
    return {
      expended: {},
      value: this.modelValue,
    };
  }
}
</script>
<style scoped>
.items {
  background-color: inherit;
  color: inherit;
}
.key-cell {
  display: flex-inline;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.desc-cell {
  display: flex-inline;
  flex: 1 1 auto;
}
</style>