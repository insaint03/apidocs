<template>
  <v-app>
    <app-bar />
    <router-view />
    <app-footer />
  </v-app>
</template>

<script>
import appBar from '@/components/appbar.vue';
import appFooter from '@/components/footer.vue';

export default {
  components: {
    appBar,
    appFooter,
  },
  data() {
    return {
    };
  }
}
</script>

<style>
body {
  margin: 0px;
}

</style>