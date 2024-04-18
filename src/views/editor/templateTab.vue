<template>
  <v-navigation-drawer location="right" :model-value="show" permanent>
    <v-list-subheader>Templates</v-list-subheader>
    <!-- search control -->
    <v-text-field v-model="search" label="Search" outlined append-icon="mdi-magnify" />
    <!-- items -->
    <v-list-item v-for="item in items" :key="`template-tab.${item.name}`" @click="$emit('select', item)">
      <v-list-item-title>{{ item.name }}</v-list-item-title>
      <v-list-item-subtitle v-if="item.extends"><v-chip>{{ item.extends }}</v-chip></v-list-item-subtitle>
    </v-list-item>
  </v-navigation-drawer>
</template>

<script>
// import Template from '@/models/template';

export default {
  name: 'templateTab',
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    modelValue: {
      type: Array,
      required: true,
    }
  },
  computed: {
    ordereds() {
      return [...this.value]
        .sort((a, b) => a.name.localeCompare(b.name));
    },
    items() {
      let filter = this.search
        ? new RegExp(this.search, 'i')
        : /^.*$/i;
      return this.ordereds.filter((it) => filter.test(it.name));
    }
  },
  data() {
    return {
      value: this.modelValue,
      search: null,
    }
  }
}

</script>