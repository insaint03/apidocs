<template>
  
</template>
<script>
import { mapWritableState, mapActions } from 'pinia';
import 

export default {
  name: 'editTemplate',
  components: {
    baseForm,
    descText,
    // tableValues,
  },
  props: {
    modelValue: {
      type: Template,
      required: true,
    }
  },
  data() {
    return {
      value: this.modelValue,
      fields: fields,
      panels: ['common'],
    }
  }
}
</script>