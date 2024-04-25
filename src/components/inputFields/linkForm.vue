<template>
  <table-values v-model="value" :fields="fields" />
</template>
<script>
import tableValues from '@/components/inputFields/tableValues.vue';
const fields = [
  {key: 'type', label: 'type', required: true, is: 'v-autocomplete', items: ['repository','homepage','package','documents','others']},
  {key: 'url', label: 'url', required: true},
]
export default {
  name: 'linkForm',
  components: {
    tableValues,
  },
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      fields,
      value: this.modelValue,
    }
  }
}
</script>