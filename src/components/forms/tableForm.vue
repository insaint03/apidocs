<template>
  <v-table>
    <slot name="header">
      <thead>

      </thead>
    </slot>
    <tbody>
      <tr v-for="field in fields" :key="`table-editor.${field.key}`">
        <th>
          <v-card elevation="0">
            <v-card-title>{{  field.label }}</v-card-title>
            <v-card-text>{{ field.desc }}</v-card-text>
            <v-card-actions v-if="field.actions">
            </v-card-actions>
          </v-card>
        </th>
        <td>
          <component v-bind="binding(field)"
            :is="field.multi ? 'v-textarea' : 'v-text-field'"
            v-model="value[field.key]"
            variant="underlined"
            @update:focused="(sets)=>!sets && on_change(field)"
          />
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
<script>

const bindings_common = {
  variant: 'underlined',
}
// textfield properties
const bindings_single = Object.assign({
  is: 'v-text-field',
  singleLine: true,
  hideDetails: true,
}, bindings_common);
// textarea properties
const bindings_multi = Object.assign({
  is: 'v-textarea',
}, bindings_common);

export default {
  name: 'tableForm',
  methods: {
    binding(field) {
      return Object.assign({
        label: field.label,
        rules: field.rules,
        ...(field.multi ? bindings_multi : bindings_single)
      });
    },
    on_change() {
      // this.$emit('update:modelValue', { ...this.modelValue, [key]: value });
    },
  },
  props: {
    fields: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: Object,
    },
  },
  data() {
    return {
      value: this.modelValue,
    }
  }
}
</script>