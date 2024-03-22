<template>
  <v-autocomplete
    v-model="value"
    :items="items"
    auto-select-first
    close-text
  >
    <template #item="{item, props}">
      <v-list-item v-bind="props" :title="`[${item.code}] ${item.desc}`">
        <v-list-item-title>{{ item.code }}</v-list-item-title>
        <v-list-item-subtitle>{{ item.title }}</v-list-item-subtitle>
      </v-list-item>
    </template>
  </v-autocomplete>
</template>
<script>
import Response from '@/models/response';
export default {
  name: 'httpStatusPicker',
  props: {
    modelValue: { type: String, required: false },
  },
  data() {
    return {
      value: this.modelValue || null,
      items: Response.statuses,
    }
  },
}
</script>