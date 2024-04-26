<template>
  <v-sheet class="ma-0 pa-0">
    <v-toolbar v-if="summary" flat color="default">
      <v-toolbar-title>{{ summary }}</v-toolbar-title>
    </v-toolbar>
    <v-textarea v-model="value" outlined rows="12" />
  </v-sheet>
</template>
<script>
export default {
  name: 'descText',
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