<template>
  <v-list>
    <v-list-subheader>{{ label }}</v-list-subheader>
    <v-list-item v-for="item in items" :key="`enum-${item}`"
      :title="item" />
  </v-list>
</template>
<script>
export default {
  name: 'enumItemsView',
  props: {
    items: Array,
    label: {
      type: String,
      default: ()=>'enum' 
    },
  },
  data() {
    return {
    };
  }
}
</script>