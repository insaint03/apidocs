<template>
  <v-tooltip location="bottom">
    <template #activator="{ props }">
      <v-textarea v-model:model-value="value"
        :label="$props.label"
        v-bind="{...props, ...$thx.field}"
        @change="$emit('change', value)"  />
    </template>
    <v-card>
      <v-divider>preview</v-divider>
      <v-card-title>{{ summary }}</v-card-title>
      <v-card-text>
        <mark-down v-model="desc" />
      </v-card-text>
    </v-card>
  </v-tooltip>
</template>

<script>
import Descriptable from '@/models/descriptable';
export default {
  name: 'markdownField',
  props: {
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
      // value: this.modelValue,
    };
  },
}

</script>