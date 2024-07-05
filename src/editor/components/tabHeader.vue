<template>
  <v-toolbar flat class="inherit-colors">
    <v-toolbar-title :color="color">
      <v-icon size="small" :color="color">{{ icon }}</v-icon>
      &nbsp;
      <slot name="title" />
    </v-toolbar-title>
    <v-spacer />
    
    <v-toolbar-items>
      <slot name="items" />
      <menu-actions v-if="menus" :actions="menus" />
    </v-toolbar-items>
  </v-toolbar>
</template>
<script>
import menuActions from '@/components/menuAction.vue';

export default {
  name: 'tabHeader',
  components: { 
    menuActions,
  },
  props: {
    icon: { type: String, required: true, },
    color: { type: String, required: true },
    menus: { type: Array, required: false, default: null}
  },
  data() {
    return {
      
    };
  }
}
</script>
<style scoped>
.inherit-colors {
  color: inherit;
  background-color: inherit;
}
</style>