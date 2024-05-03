<template>
  <v-navigation-drawer loctaion="left" :model-value="modelValue" title="datatypes" permanent>
    <v-list>
      <v-list-subheader v-bind="props">Parameters</v-list-subheader>
      <v-divider />
      <v-list-group value="form-area">
        <template #activator="{ props }">
          <v-list-item v-bind="props">
            <v-text-field v-model="search" label="Name" hide-details 
              prepend-icon="mdi-filter" 
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
      <v-list-group v-show="0 < items_count_of(grp)" v-for="grp in origins" :key="`param-grp.${grp}`" :value="grp.name">
        <template #activator="{ props }">
          <v-list-item v-bind="props">
            <v-list-item-title>
              {{ grp.name }}
              <v-badge inline :content="items_count_of(grp)" />
            </v-list-item-title>
          </v-list-item>
        </template>
        <v-list-item v-for="it in items_of(grp)" :key="`param-item.${grp.name}.${it.name}`" 
          :title="it.name" :subtitle="it.basistype"
          @click="selects(it)">
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import Parameter from '@/models/parameter';
import { mapWritableState } from 'pinia';
import { useServiceStore } from '@/stores/service';

const sorts = (params) => [...params].sort((l, r) => (l.name || l).localeCompare((r.name || r)));


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
      let it = Parameter.create(this.search || null);
      if (it) {
        this.parameters.push(it);
      }
    },
    init() {
      console.log('params', {
        origins: Parameter.origins,
        primitves: Parameter.primitives,
        items: this.items,
        all: Parameter.all,
      });
    },
    selects(...items) {
      console.log('on select', items);
      this.$emit('select', items);
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
    ordereds() { return sorts(this.parameters); },
    items() {
      let filter = this.search
        ? new RegExp(this.search, 'i')
        : /^.*$/i;
      return this.ordereds.filter((it) => filter.test(it.name));
    },
    origins() {
      return Parameter.primitives;
    },
    ...mapWritableState(useServiceStore, ['parameters']),
  },
  data() {
    return {
      search: null,
      value: this.modelValue,
      open_groups: [],
    }
  }
}
</script>