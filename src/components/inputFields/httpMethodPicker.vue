<template>
  <v-autocomplete v-model="value"
    auto-select-first
    close-text open-text
    :items="methods"  
    label="method"  />
</template>

<script>
import Request from '@/models/request';

export default {
  name: 'httpMethodPicker',
  props: {
    modelValue: { type: String, required: false },
  },
  computed: {
  },
  data() {
    return {
      methods: Request.methods,
      value: this.modelValue || 'GET',
    }
  }
}
</script>