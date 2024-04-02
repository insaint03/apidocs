<template>
  <v-dialog :model-value="show">
    <v-card>
      <v-card-item @click="dispose">
        <slot name="title">
          <v-card-title>Title</v-card-title>
          <v-card-subtitle>Subtitle</v-card-subtitle>
        </slot>
      </v-card-item>
      <slot>
        <base-form :fields="fields" v-model="value" />
      </slot>
      <slot name="actions">
        <v-card-actions>
          <v-btn text @click="dispose">Close</v-btn>
          <v-spacer />
          <v-btn text @click="reset">Reset</v-btn>
          <v-btn text @click="save">Save</v-btn>
        </v-card-actions>
      </slot>
    </v-card>
  </v-dialog>
</template>

<script>
import baseForm from './baseForm.vue';

export default {
  name: 'modalForm',
  components: {
    baseForm,
  },
  props: {
    fields: {
      type: Array,
      required: false,
      default: () => [],
    },
    modelValue: {
      type: Object,
      required: false,
    },
    show: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  watch: {
    show(v) {
      if (v) {
        this.reset();
      }
    }
  },
  methods: {
    dispose() { this.$emit('update:show', false); },
    reset() { this.value = Object.assign({}, this.modelValue); },
    save() {
      this.$emit('update:modelValue', this.value);
      this.dispose();
    }
  },
  data() {
    return {
      dialog: false,
      value: Object.assign({}, this.modelValue),
    }
  }
}
</script>