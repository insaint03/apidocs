<template>
  <v-navigation-drawer loctaion="left" :model-value="modelValue" title="datatypes" permanent>
    <v-list>
      <v-list-subheader v-bind="props">Parameters</v-list-subheader>
      <v-divider />
      <v-list-group value="form-area">
        <template #activator="{ props }">
          <v-list-item v-bind="props">
            <v-text-field v-model="search_text" label="Name" hide-details clearable
              append-inner-icon="mdi-plus" @click:append-inner.stop="append" @click.stop />
            <!-- appending icon -->
          </v-list-item>
          <v-divider />
        </template>
        <!-- search -->
        <!-- type hierarchy filter -->
        <v-list-item title="descendant">
        </v-list-item>
        <!-- show by tagname -->
        <v-list-item title="tagname">

        </v-list-item>
        <!-- show migrations only -->
        <v-list-item title="migrations">

        </v-list-item>
      </v-list-group>
      <v-divider />
      <!-- primitive grouping -->
      <v-list-group v-for="grp in groupeds" :key="`param-grp.${grp.name}`" :value="grp.name">
        <template #activator="{ props }">
          <v-list-item v-bind="props" v-show="0<grp.items.length">
            <v-list-item-title>
              {{ grp.name }}
              <v-badge inline :content="items_count_of(grp)" />
            </v-list-item-title>
          </v-list-item>
        </template>
        <v-list-item v-for="it in grp.items" :key="`param-item.${grp.name}.${it.name}`" 
          :title="it.name" :subtitle="it.basistype"
          v-show="search(it)"
          @click="single_select(it)"
          @click.ctrl="multi_select(it)">
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import Parameter from '@/models/parameter';
import { mapWritableState, mapActions } from 'pinia';
import { useDatatypeStore } from '@/stores/datatype';


export default {
  name: 'datatypeTab',
  methods: {
    items_count_of(origin) {
      return this.items_of(origin).length;
    },
    items_of(origin) {
      return this.items.filter((it) => it.is_descendant_of(origin));
    },
    append() {
      let it = Parameter.create(this.search_text);
      if (it) {
        this.parameters.push(it);
      }
    },
    init() {
    },
    ...mapActions(useDatatypeStore, [
      'search','unselect','single_select','multi_select',
    ]),
  },
  watch: {
    selection() {
      this.$emit('select', this.selection);
    }
  },
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    }
  },
  onUpdated() {

  },
  computed: {
    item_groups() {
      return Parameter.origins.map((o)=>{
        return {
          group: o,
          name: o.name,
          items: this.ordereds.filter((it)=>it.origintype == o.name),
        }
      }).filter((grp)=>grp.items.length >0);
    },
    search_pattern() {
      return this.search ? new RegExp(this.search, 'i') : null;
    },
    ...mapWritableState(useDatatypeStore, [
      'all',
      'origins',
      'items',
      'ordereds',
      'search_text',
      'groupeds',
    ]),
  },
  data() {
    return {
      value: this.modelValue,
      open_groups: [],
      selection: null,
    }
  }
}
</script>@/stores/datatype