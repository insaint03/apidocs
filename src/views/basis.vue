<template>
  <v-app>
    <slot name="appBar">
      <app-bar :title="title">
        <slot name="navigation_menu"></slot>
      </app-bar>
    </slot>
    <v-main>
        <slot />
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