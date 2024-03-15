<template>
  <v-card>
    <v-card-title>
      <slot name="title">dialog title</slot>
    </v-card-title>
    <v-container>
      <slot />

    </v-container>
    <slot name="actions" />
  </v-card>
</template>
<script>
export default {
  name: 'formCard',
  props: {
  },
  methods: {
  },
  data() {
    return {
    }
  },
}
</script>