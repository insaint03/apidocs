<template>
  <base-form v-model="value" :fields="fields">
    
  </base-form>
</template>

<script>
import Parameter from '@/models/parameter';
// import formCard from './formCard.vue';
import baseForm from './baseForm.vue';
import fields from '@/fields.js';

export default {
  name: 'parameterForm',
  components: {
    // formCard,
    baseForm,
  },
  methods: {
    remove() {
      this.$emit('remove');
    },
  },
  props: {
    modelValue: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    readonly: {
      type: Boolean,
      required: false,
      default: ()=>false,
    }
  },
  computed: {
    alltypes() {
      return Parameter.all;
    },
  },
  data() {
    return {
      value: this.modelValue,
      fields: fields.parameters,
    }
  }
}
</script>