<template>
  <v-navigation-drawer loctaion="left" :model-value="modelValue" title="datatypes" permanent>
    <v-list-subheader>Parameters</v-list-subheader>
    <!-- search -->
    <v-text-field v-model="search" label="Search" outlined append-icon="mdi-magnify" />
    <v-divider />
    <!-- primitive grouping -->
    <v-list-group v-for="grp in primitives" :key="`datatype-grp-${grp.name}`" :value="grp.name">
      <template v-slot:activator="{ props }">
        <v-list-item v-bind="props"
          v-for="item in items.filter((it)=>it.origintype===grp.name)" 
          :key="`datatype-it-${grp.name}x${item.name}`"
          :title="item.name"
          :subtitle="item.basistype"
          @click="$emit('select', item)">
        </v-list-item>
      </template>
    </v-list-group>
  </v-navigation-drawer>
</template>

<script>
import Parameter from '@/models/parameter';
import { mapWritableState } from 'pinia';
import { useServiceStore } from '@/stores/service';

export default {
  name: 'datatypeTab',
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    }
  },
  computed: {
    ordereds() {  
      return [...this.parameters]
        .sort((a,b)=>a.name.localeCompare(b.name));
    },
    items() {
      let filter = this.search 
        ? new RegExp(this.search, 'i') 
        : /^.*$/i;
      return this.ordereds.filter((it)=>filter.test(it.name));
    },
    ...mapWritableState(useServiceStore, ['parameters']),
  },
  data() {
    return {
      search: null,
      primitives: Parameter.primitives,
      value: this.modelValue,

    }
  }
}
</script>