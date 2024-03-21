<template>
  <v-autocomplete v-model="value" 
    :items="items" item-value="name" item-title="name" 
    auto-select-first close-text
    @keyup.enter="force_update"
    @blur="force_update"
  />
</template>

<script>
import Parameter from '@/models/parameter';

import { mapWritableState } from 'pinia';
import { useServiceStore } from '@/stores/service';

export default {
  name: 'parameterPicker',
  props: {
    modelValue: { type: String, required: false },
    derived: { type: [String, Array], required: false },
    expecting: { type: String, required: false, default: ()=>'object'},
  },
  methods: {
    force_update() {
      let name = this.value;
      console.log('force_update', name);
      if(!Parameter.name_exists(name)) {
        // create new if not exists
        this.parameters.push(Parameter.create(name, this.expecting));
      }
    }
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
    ...mapWritableState(useServiceStore, ['parameters']),
  },
  data() {
    return {
    }
  }
}
</script>