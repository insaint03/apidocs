<template>
  <v-autocomplete v-model="value" v-model:search="search"
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
    modelValue: { type: [String, Array], required: false },
    origin: { type: [String, Array], required: false },
    expecting: { type: String, required: false, default: ()=>'object'},
  },
  methods: {
    force_update() {
      let name = this.search;
      if(0<name.trim().length && !Parameter.name_exists(name)) {
        // create new if not exists
        let newtype = Parameter.create(name, this.expecting)
        this.parameters.push(newtype);
        this.value = newtype;
      }
    }
  },
  computed: {
    value: {
      get() { return this.modelValue; },
      set(v) { this.$emit('update:modelValue', v); },
    },
    items() {
      switch(typeof(this.origin)) {
        case 'string':
          return Parameter[this.origin] || Parameter.children(this.origin);
        case 'array':
          return this.origin.reduce((ret, d)=>{
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
      search: null,
    }
  }
}
</script>