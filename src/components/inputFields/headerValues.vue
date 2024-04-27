<template>
  <list-values v-model="value" :fields="fields" label="header"
    itemId="key" itemTitle="key" itemSubtitle="datatype" />
</template>
<script>
import listValues from '@/components/inputFields/listValues.vue';
import fields from '@/fields.js';

export default {
  name: 'headerValues',
  components: {
    listValues
  },
  props: {
    modelValue: { type: Array, required: false },
  },
  data() {
    return {
      value: this.modelValue,
      fields: fields.header,
    }
  }
}
</script>
