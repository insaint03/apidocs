<template>
  <v-form>
    <component v-for="field in fields" :key="field.key" 
      :is="field.is || 'v-text-field'"
      :modelValue="modelValue[field.key]" 
      readonly
      variant="underlined"
      v-bind="field"
    />
  </v-form>
</template>

<script>
export default {
  name: 'viewForms',
  props: {
    modelValue: Object,
    fields: Array,
  },
  data() {
    return {

    }
  }
}
</script>