<template>
  <v-menu v-bind="menuProps">
    <template #activator="{ props }">
      <v-btn icon v-bind="props">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>
    <v-list density="compact" lines="one"
      v-bind="listProps">
      <v-list-item v-for="act,ai in actions" :key="`menu-act.${ai}`"
        v-bind="act" @click="act.callback" />
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'menuActions',
  methods: {
  },
  props: {
    menuProps: { type: Object, default: () => ({}) },
    listProps: { type: Object, default: () => ({}) },
    actions: { type: Array, default: () => [] },
  },
  data() {
    return {

    };
  },
}
</script>