<template>
  <v-autocomplete :model-value="items"
    v-bind="$thx.field" :label="label" chips>
  </v-autocomplete>
</template>
<script>
export default {
  name: 'arrayItemsView',
  props: {
    items: Array,
    label: {
      type: String,
      default: ()=>'properties' 
    },
  },
  computed: {
    item_names() {
      return this.items;
    }
  },
  data() {
    return {
    };
  }
}
</script>