<template>
  <v-tooltip :location="location">
    <template #activator="{props}">
      <slot name="activator" :props="props">
      </slot>
    </template>
    <v-card flat class="tool-card">
      <v-card-item>
        <v-card-title><slot name="title"></slot></v-card-title>
        <v-card-subtitle><slot name="subtitle"></slot></v-card-subtitle>
      </v-card-item>
      <v-card-text>
        <slot>
        </slot>
      </v-card-text>
    </v-card>
  </v-tooltip>
</template>

<script>
export default {
  name: 'tool-card',
  props: {
    location: {type: String, default: 'bottom'},
  },
  data() {
    return {
    };
  }
}
</script>

<style scoped>
.tool-card {
  width: 45vw;
  max-width: 95vw;
  min-height: 300px;
  max-height: 50vh;
  background-color: inherit;
  color: inherit;
}
</style>