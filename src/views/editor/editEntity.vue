<template>
  <h1>Edit Entity</h1>
</template>
<script>
export default {
  name: 'editEntity',
  props: {
    modelValue: {
      // type: Array,
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