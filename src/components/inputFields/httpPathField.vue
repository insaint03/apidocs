<template>
  <v-text-field v-model="value" label="Path" />
</template>

<script>
export default {
  name: 'httpPathField',
  props: {
    modelValue: { type: String, required: false },
  },
  data() {
    return {
      value: this.modelValue || '/',
    }
  }
}
</script>