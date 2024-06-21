<template>
  <v-app>
    <router-view />
    <v-footer app absolute style="height: 100vh;">
      <v-row>
        <v-col>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
    };
  }
}
</script>

<style scoped>
body {
  margin: 0px;
}
</style>