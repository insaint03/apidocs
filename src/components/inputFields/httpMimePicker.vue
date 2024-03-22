<template>
  <v-autocomplete
    v-model="value"
    :items="items"
    auto-select-first
    close-text
    />
</template>

<script>
import Response from '@/models/response';
export default {
  name: 'httpMimePicker',
  props: {
    modelValue: { type: String, required: false },
  },
  data() {
    return {
      value: this.modelValue || null,
      items: Response.mimetypes,
    }
  }
}
</script>