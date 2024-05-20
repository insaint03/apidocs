<template>
  <list-values v-model="value" :fields="fields" label="query"
    itemId="key" itemTitle="key" itemSubtitle="datatype" 
    @change="$emit('change', ...arguments)"
  />
</template>
<script>
import listValues from '@/components/inputFields/listValues.vue';
import fields from '@/fields.js';

export default {
  name: 'queryValues',
  components: {
    listValues
  },
  props: {
    modelValue: { type: Array, required: false },
  },
  data() {
    return {
      value: this.modelValue,
      fields: fields.query,
    }
  }
}
</script>