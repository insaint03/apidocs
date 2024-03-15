<template>
  <v-app app>
    <h1>{{  message }}</h1>
    <main>
      <router-view />
    </main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello Vue 3!',
    };
  }
}
</script>