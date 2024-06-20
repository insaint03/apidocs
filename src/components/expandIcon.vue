<template>
  <md-icon :icon="value"></md-icon>
</template>

<script>
import mdIcon from './icon.vue';
export default {
  name: 'expandIcon',
  components: {
    mdIcon,
  },
  props: {
    modelValue: Boolean,
    open: {type: String, default: 'chevron-up'},
    close: {type: String, default: 'chevron-down'},
  },
  computed: {
    icon() {
      return this.value ? this.open : this.close;
    },
    value: {
      get() {
        return this.modelValue ? this.open : this.close;
      },
      set(v) {
        this.$emit('update:modelValue', v);
      }
    }
  },
  data() {
    return {
    };
  }
}
</script>