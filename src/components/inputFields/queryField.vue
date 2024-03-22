<template>
  <table-values :fields="fields" v-model="value" />
</template>
<script>
import tableValues from './tableValues.vue';
import fields from '@/fields.js';

export default {
  name: 'queryField',
  components: {
    tableValues,
  },
  props: {
    modelValue: { type: Array, required: false },
  },
  data() {
    console.log(fields.query);
    return {
      value: this.modelValue || [{}],
      fields: fields.query,
    }
  }
}
</script>