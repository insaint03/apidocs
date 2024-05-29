<template>
  <v-list>
    <v-list-item v-for="(ii,it) in modelValue" :key="`view-item.${ii}`">
      <v-list-item-icon>
        <v-icon>{{ iconMap[it.icon] }}</v-icon>
      </v-list-item-icon>
      <v-list-item-title>{{ it[itemTitle || 'title'] }}</v-list-item-title>
      <v-list-item-subtitle v-if="itemSubtitle">{{ it[itemSubtitle] }}</v-list-item-subtitle>
    </v-list-item>
  </v-list>
</template>
<script>
export default {
  name: 'viewItems',
  props: {
    modelValue: Array,
    itemId: String,
    itemTitle: String,
    itemSubtitle: String,
    itemLinks: Array,
    iconMap: Object,
  },
  data() {
    return {  

    };
  }
}
</script>