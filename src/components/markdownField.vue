<template>
  <v-textarea v-model:model-value="value"
    :label="$props.label"
    hint="first line is summary, rests are long markdown description"
    v-bind="{...props, ...$thx.field}"
    @change="$emit('change', value)"  
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
  props: {
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