<template>
  <parameter-picker v-if="is_array" v-model="value" multi />
  <list-values v-else-if="is_object" v-model="value" :fields="fields" />
  <v-divider v-else />
</template>
<script>
import Parameter from '@/models/parameter';
import fields from '@/fields';
import parameterPicker from '@/components/inputFields/parameterPicker.vue';
import listValues from '@/components/inputFields/listValues.vue';

export default {
  name: 'parameterItemsForm',
  components: {
    parameterPicker,
    listValues,
  },
  methods: {

  },
  props: {
    basis: {
      type: Parameter,
      required: true,
    },
    modelValue: {
      type: Object,
      required: true,
    },
  },
  computed: {
    is_array() { return this.basis.origintype == 'array'; },
    is_object() { return this.basis.origintype == 'object'; },
  },
  data() {
    return {
      value: this.modelValue,
      fields: fields.items,
      names_new: [],
      basis_new: null,
    }
  },
}
</script>