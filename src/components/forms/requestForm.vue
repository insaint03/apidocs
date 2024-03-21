<template>
  <form-card>
    <template #title>
      <v-toolbar-title>
        [{{ value.method || 'GET' }}] {{ value.name }}
      </v-toolbar-title>
    </template>

    <base-form v-model="value" :fields="fields">
    </base-form>
  </form-card>
</template>

<script>
import Parameter from '@/models/parameter';
import Request from '@/models/request';

import formCard from '@/components/forms/formCard.vue';
import baseForm from '@/components/forms/baseForm.vue';

const requestFields = [
  { key: 'method', label: 'Method', is: 'v-select', items: Request.methods, cols: 4 },
  { key: 'path', label: 'Path', is: 'v-text-field', cols: 6 },
  { key: 'queries', label: 'Query' },
  { key: 'cookies', label: 'Cookies', },
  { key: 'headers', label: 'Headers', },
  { key: 'body', label: 'Body', is: 'parameter-picker', items: Parameter.all },
];

export default {
  name: 'requestForm',
  components: {
    formCard,
    baseForm,
  },
  props: {
    modelValue: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  data() {
    return {
      value: this.modelValue,
      fields: requestFields,
    };
  }
}
</script>