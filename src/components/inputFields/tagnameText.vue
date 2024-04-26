<template>
  <toggle-text v-model="value" text="set category tagname" :fieldProps="fieldProps" />
</template>
<script>
import toggleText from '@/components/inputFields/toggleText.vue';

export default {
  name: 'tagnameText',
  components: {
    toggleText,
  },
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      fieldProps: {
        placeholder: 'tag name',
      },
      value: this.modelValue,
    }
  }
}
</script>