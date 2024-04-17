<template>
  <h1>Edit Template</h1>
</template>
<script>
export default {
  name: 'editTemplate',
  props: {
    modelValue: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      value: this.modelValue,
    }
  }
}
</script>