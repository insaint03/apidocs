<template>
  <v-autocomplete v-model="value" :items="items" item-key="code" item-value="code" auto-select-first>
    <template #item="{ item, props }">
      <v-tooltip right v-bind="props">
        <template #activator="{props}">
          <v-list-item v-bind="props" lines="one" @click="value=item.value">
            <v-list-item-title>{{ item.raw.code }}</v-list-item-title>
            <v-list-item-subtitle>{{ item.raw.title }}</v-list-item-subtitle>
          </v-list-item>
        </template>
        <!-- tooltip description -->
        [{{ item.raw.code }}] {{ item.raw.desc }}
      </v-tooltip>
    </template>
  </v-autocomplete>
</template>
<script>
import Response from '@/models/response';
export default {
  name: 'httpStatusPicker',
  props: {
    modelValue: { type: [Number, String], required: false },
  },
  data() {
    return {
      value: this.modelValue,
      items: Response.status_all,
    }
  },
}
</script>