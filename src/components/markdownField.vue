<template>
  <v-textarea v-model:model-value="value"
    :label="$props.label"
    :name="name"
    hint="first line is summary, rests are long markdown description"
    auto-grow
    v-bind="{...$thx.field}"
    @change="($ev)=>$emit('change', $ev)"  
    @focus="focused=true" @blur="focused=false"
  />
  <div v-show="focused">
    <v-divider>preview</v-divider>
    <v-card flat class="border-thin">
      <v-card-title>{{ summary }}</v-card-title>
      <mark-down v-model="desc" />
    </v-card>
  </div>
</template>

<script>
import Descriptable from '@/models/descriptable';
export default {
  name: 'markdownField',
  emits: ['update:modelValue', 'change'],
  props: {
    readonly: Boolean,
    variant: String,
    name: String,
    label: String,
    modelValue: String,
  },
  computed: {
    value: {
      get(){ return this.modelValue; },
      set(value) { this.$emit('update:modelValue', value); }
    },
    summary(){
      return Descriptable.get_summary(this.value)
    },
    desc(){
      return Descriptable.get_desc(this.value)
    },
  },
  data() {
    return {
      focused: false,
      // value: this.modelValue,
    };
  },
}

</script>