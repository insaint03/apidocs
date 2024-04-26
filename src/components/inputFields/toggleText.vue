<template>
<v-input v-bind="inputProps">
  <v-btn @click="value = ''" v-if="!has_value" v-bind="btnProps" >{{  text }}</v-btn>
  <slot v-else name="field" :v="value" :clear>
    <v-text-field v-model="value" v-bind="fieldProps" prepend-inner-icon="mdi-close" @click:prepend-inner="clear" />
  </slot>
</v-input>
</template>
<script>
export default {
  name: 'toggleText',
  methods: {
    clear() {
      this.value = null;
    }
  },
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    inputProps: {
      type: Object,
      requied: false,
    },
    fieldProps: {
      type: Object,
      requied: false,
    },
    btnProps: {
      type: Object,
      requied: false,
    },
  },
  computed: {
    has_value() {
      return this.value != null;
    }
  },
  data() {
    return {
      value: this.modelValue,
    }
  }
}
</script>