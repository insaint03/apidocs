<template>
  <v-autocomplete v-model="value" v-model:search="search"
    :items="items" item-title="name" 
    auto-select-first close-text
    @keyup.enter="force_update"
    @update:modelValue="on_change"
    :chips="multi" :multiple="multi"
    :key="`param-picker.updated.${treeshaped}`"
  />
</template>

<script>
import Datatype from '@/models/datatype';

import { mapActions, mapWritableState } from 'pinia';
import { useParameterStore } from '@/stores/parameter';

export default {
  name: 'parameterPicker',
  props: {
    modelValue: { type: [String, Array], required: false },
    origin: { type: [String, Array], required: false },
    expecting: { type: String, required: false, default: ()=>'object'},
    shaker: { type: Boolean, required: false, default: false },
    multi: { type: Boolean, required: false, default: false},
  },
  methods: {
    on_change(v) {
      // run update
      this.$emit('change', v);
      this.$emit('update:modelValue', v);
      if(this.shaker) {
        this.shake();
      }
    },
    async force_update() {
      let name = this.search;
      if(0<name.trim().length && !Datatype.name_exists(name)) {
        // create new type
        this.appends('string', name);
        // update the value
        this.$emit('change', this.value)
      }
    },
    ...mapActions(useParameterStore, ['appends', 'shake']),
  },
  computed: {
    items() {
      let filter = ()=>true;
      switch(typeof(this.origin)) {
        case 'string': 
          filter = (p)=>p.origintype === this.origin;
          break;
        case 'array':
          filter = (p)=>this.origin.includes(p.origintype);
          break;
        default: 
          break;
      }
      return this.all.filter(filter);
    },
    ...mapWritableState(useParameterStore, [
      'all', 'treeshaped',
    ]),
  },
  data() {
    return {
      value: this.modelValue,
      search: null,
    }
  }
}
</script>