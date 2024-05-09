<template>
  <component 
    v-model="value"
    :is="component"
    v-bind="binding"
    @change="change"
    @update:focused="(sets)=>!sets && change()"
  />
</template>

<script>
import preset from './presets.yaml';
import inputFields from '@/components/inputFields';


export default {
  components: {
    ...inputFields,
  },
  methods: {
    change() {
      this.$emit('update:modelValue', this.value);
      this.$emit('change', this.value);
    }
  },
  props: {
    fieldId: {
      type: String,
      required: true,
    },
    modelValue: {
      required: false,
    },
    binds: {
      type: Object,
      required: false,
      default: ()=>({}),
    },
  },
  computed: {
    commonProps() {
      return {
        ...preset.common.all || {},
        ...preset.common[this.component] || {},
      };
    },
    inputProps() {
      return preset.inputs[this.fieldId] || {};
    },
    component() {
      return (this.binds || {}).component
        || this.inputProps.component
        || 'v-text-field';
    },
    binding() {
      let ret = {
        // ...this.$props,
        ...this.commonProps,
        ...this.inputProps,
        ...this.binds,
      };
      return ret;
    },
  },
  data() {
    return {
      value: this.modelValue,
    }
  }
}

</script>