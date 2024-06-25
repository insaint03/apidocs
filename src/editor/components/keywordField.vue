<template>
  <v-autocomplete
    :model-value="values"
    :search="search" :items="items"
    :label="label" v-bind="$thx.field"
    multiple chips 
  />
</template>
<script>
export default {
  name: 'keywordField',
  props: {
    modelValue: String,
    label: {type: String, required: false, default: 'keywords' },
  },
  computed: {
    items() {
      return this.modelValue.concat([this.search, ...this.search.split(/[,\s]+/g)])
        .filter((t)=>t&&t.trim().length>0);
    },
    values: {
      get() {
        return this.value;
      },
      set(v) {
        this.value = v;
        this.$emit('update:modelValue', v.join(','));
      }
    }
  },
  data() {
    return {
      value: this.modelValue.split(/[,\s]+/g).filter((t)=>t&&t.trim().length>0),
      search: '',
    };
  },
}
</script>