<template>
  <list-values v-model="value" :fields="fields" label="contributors"
    itemId="name" itemTitle="name" itemSubtitle="role" />
</template>
<script>
import listValues from '@/components/inputFields/listValues.vue';
const contributor_fields = [
  {key: 'name', label: 'name', required: true},
  {key: 'role', label: 'role', required: true, is: 'v-autocomplete', items: ['author','contributor','tester']},
  {key: 'email', label: 'email', required: false },
]
export default {
  name: 'contributorForm',
  components: {
    listValues,
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