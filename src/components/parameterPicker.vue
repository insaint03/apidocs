<template>
  <v-autocomplete v-model="value" :items="items" item-value="name" item-title="name" auto-select-first label="basetype" density="compact">
  </v-autocomplete>
</template>

<script>
import Parameter from '@/models/parameter';
export default {
  name: 'parameterPicker',
  props: {
    modelValue: { type: String, required: false },
    derived: { type: [String, Array], required: false },
  },
  computed: {
    value: {
      get() { return this.modelValue; },
      set(v) { this.$emit('update:modelValue', v); },
    },
    items() {
      switch(typeof(this.derived)) {
        case 'string':
          return Parameter[this.derived] || Parameter.children(this.derived);
        case 'array':
          return this.derived.reduce((ret, d)=>{
            ret.concat(Parameter[d] || Parameter.children(d));
          }, [])
          .filter((v, i, a) => a.indexOf(v) === i);
        default:
          return Parameter.all;
      }
    },
  },
  data() {
    return {
    }
  }
}
</script>