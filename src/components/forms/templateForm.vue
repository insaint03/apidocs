<template>
  <form-card>
    <template #title>
      <v-toolbar-title>{{ value.name }}</v-toolbar-title>
    </template>

    <template #default>
        <!-- descriptions -->
        <v-text-field v-model="value.summary" label="summary" />
        <v-text-field v-model="value.description" label="Description" />
        <!-- tagname -->

        <!-- parent template -->

        <!-- request options -->

        <!-- response options -->

    </template>
  </form-card>
</template>

<script>
export default {
  name: 'templateForm',
  props: {
    modelValue: {
      type: Object,
      required: true,
      default: () => ({}),
    }
  },
  data() {
    return {
      value: this.modelValue,
    }
  }
}
</script>