<template>
  <v-app>
    <v-main scrollable>
    <slot name="appBar">
      <app-bar :title="title">
        <slot name="navigation_menu"></slot>
      </app-bar>
    </slot>
      <v-sheet class="d-flex ma-1 pa-1">
        <slot />
      </v-sheet>
    </v-main>
  </v-app>
</template>

<script>
import appBar from '@/components/appBar.vue';
export default {
  name: 'basisPage',
  components: {
    appBar
  },
  props: {
    title: { type: String, required: false, default: 'ApiDocs' },
  },
  data() {
    return {
    }
  }
}
</script>