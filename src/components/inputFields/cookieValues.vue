<template>
  <list-values v-model="value" :fields="fields" label="cookie"
    itemId="key" itemTitle="key" itemSubtitle="datatype" />
</template>
<script>
import listValues from '@/components/inputFields/listValues.vue';
import fields from '@/fields.js';

export default {
  name: 'cookieValues',
  components: {
    listValues
  },
  props: {
    modelValue: { type: Array, required: false },
  },
  data() {
    return {
      value: this.modelValue,
      fields: fields.cookie,
    }
  }
}
</script>
