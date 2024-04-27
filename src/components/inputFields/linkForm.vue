<template>
  <list-values v-model="value" :fields="fields" label="links" 
    itemTitle="type" itemSubtitle="url" itemId="url" />
</template>
<script>
import listValues from '@/components/inputFields/listValues.vue';
const fields = [
  {key: 'type', label: 'type', required: true, is: 'v-autocomplete', items: ['repository','homepage','package','documents','others']},
  {key: 'url', label: 'url', required: true},
]
export default {
  name: 'linkForm',
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
      fields,
      value: this.modelValue,
    }
  }
}
</script>