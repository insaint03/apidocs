<template>
  <v-sheet class="ma-0 pa-0">
    <v-toolbar v-if="summary" flat color="default">
      <v-toolbar-title>{{ summary }}</v-toolbar-title>
    </v-toolbar>
    <v-textarea v-model="value" outlined rows="12" 
      @update:focused="(sets)=>!sets&&changes()" />
  </v-sheet>
</template>
<script>
export default {
  name: 'descText',
  methods: {
    changes() {
      this.$emit('update:modelValue', this.value);
      this.$emit('change', this.value);
    }
  },
  props: {
    modelValue: {
      type: String,
      required: false,
    
    },
  },
  computed: {
    at_multilines() {
      return this.lines.length > 1;
    },
    lines() {
      return (this.value || '').trim().split('\n');
    },
    summary() {
      return this.at_multilines
        ? this.lines[0]
        : null;
    }
  },
  data() {
    return {
      value: this.modelValue,
    }
  }
}
</script>