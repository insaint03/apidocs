<template>
  <v-autocomplete v-model="value" :items="items" item-value="name" item-title="name" auto-select-first label="basetype">
  </v-autocomplete>
</template>

<script>
import Datatype from '@/models/datatype';
export default {
  name: 'datatypePicker',
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
          return Datatype[this.derived] || Datatype.children(this.derived);
        case 'array':
          return this.derived.reduce((ret, d)=>{
            ret.concat(Datatype[d] || Datatype.children(d));
          }, [])
          .filter((v, i, a) => a.indexOf(v) === i);
        default:
          return Datatype.all;
      }
    },
  },
  data() {
    return {
    }
  }
}
</script>