<template>
  <table-values v-model="value" :fields="fields" />
</template>
<script>
import tableValues from '@/components/inputFields/tableValues.vue';
const contributor_fields = [
  {key: 'name', label: 'name', required: true},
  {key: 'role', label: 'role', required: true, is: 'v-autocomplete', items: ['author','contributor','tester']},
  {key: 'email', label: 'email', required: false },
]
export default {
  name: 'contributorForm',
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
      fields: contributor_fields,
      value: this.modelValue,
    }
  }

}
</script>