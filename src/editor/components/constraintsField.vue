<template>
  <v-textarea v-model="texts" :label="label" v-bind="$thx.field"
    :disabled="disabled"
    @focus="focused=true" @blur="changes"
    :placeholder="placeholder" />
  <div v-show="focused">
    <v-divider>preview</v-divider>
    <v-list slim density="compact">
      <v-list-item v-for="([prefix,name],ii) in items" :key="`msg-constraint.${ii}-${prefix}.${name}`"
        :subtitle="prefix" :title="name">
      </v-list-item>
    </v-list>
  </div>
</template>
<script>
import Patterns from '@/models/patterns.js';


const serializes = (values)=>{
  return Array.isArray(values)
    ? values.map((v)=>typeof(v)==='string'?v:Patterns.type_constraint_serialize(v)).join('\n')
    : values || '';
}
export default {
  name: 'messageConstraintField',
  methods: {
    changes() {
      this.focused = false;
      this.$emit('update:model-value', this.lines);
    },
  },
  watch: {
    modelValue() {
      this.texts = serializes(this.modelValue);
    },
  },
  props: {
    modelValue: {
      type: [String, Array],
    },
    label: {
      type: String,
      default: ()=>'body constraints',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    // model_mode() {
    //   return Array.isArray(this.modelValue) ? 'array' : 'string';
    // },
    lines() {
      return this.texts.split('\n')
        .map((ln)=>ln.trim())
        .filter((ln)=>ln!=null && ln.length>0);
    },
    items() {
      return this.lines
        .map(Patterns.type_constraint_parse)
        .map((it)=>Object.entries(it).flat());
    },
    model_update() {
      const items =this.items.filter((it)=>it!=null);
      return Array.isArray(this.modelValue) 
        ? items.map(([k,v])=>Patterns.type_constraint_serialize({[k]:v}))
        : items.join('\n');
    },
  },
  data() {
    return {
      focused: false,
      texts: '',
      placeholder: Object.entries(Patterns.type_constraint_prefixs)
        .map(([k,v])=>`${k}: ${v}`).join('\n'),
    };
  },
}
</script>