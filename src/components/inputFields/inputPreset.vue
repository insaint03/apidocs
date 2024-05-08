<template>
  <component 
    v-model="value"
    :is="component"
    v-bind="binding"
    @change="change()"
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
      this.$emit('change', this.value);
    }
  },
  props: {
    fieldId: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Object,
      required: true,
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
      console.log(preset.inputs, this.fieldId);
      return preset.inputs[this.fieldId] || {};
    },
    component() {
      return this.inputProps.component || 'v-text-field';
    },
    binding() {
      return {
        ...this.commonProps,
        ...this.inputProps,
        ...this.$props,
      }
    },
  },
  data() {
    return {
      value: this.modelValue,
    }
  }
}

</script>