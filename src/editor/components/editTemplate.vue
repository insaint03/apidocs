<template>
  <h1>Template</h1>
</template>
<script>
import Template from '@/models/template';
import fields from '@/fields';

export default {
  name: 'editTemplate',
  components: {
    // baseForm,
    // descText,
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