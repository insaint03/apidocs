<template>
  <v-app app>
    <v-main>
    <slot name="appBar">
      <app-bar :title="title">
        <slot name="navigation_menu"></slot>
      </app-bar>
    </slot>
      <v-container fluid>
        <slot>

        </slot>
      </v-container>
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