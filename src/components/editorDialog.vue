<template>
  <v-dialog :model-value="open" @update:model-value="$emit('update:show', $event)">
    <v-card>
      <slot name="items">
        <v-card-item>
          <slot name="title">
            <v-card-title>{{ title }}</v-card-title>
          </slot>
          <slot name="subtitle">
            <v-card-subtitle>{{ subtitle }}</v-card-subtitle>
          </slot>
        </v-card-item>
      </slot>
      <v-card-text :key="`dlg-updated.${last_updated}`">
        <v-form>
          <slot>
            <template v-for="field in fields" :key="`field-${field.key}`">
              <slot :name="`field-${field.key}`" :field="field" :value="value">
                <component v-bind="field" :is="field.is || 'v-text-field'" v-model="value[field.key]" />
              </slot>
            </template>
          </slot>
        </v-form>
      </v-card-text>
      <slot name="actions">
        <v-card-actions>
          <v-btn @click="reset" color="warning">Reset</v-btn>
          <v-btn @click="dispose" color="danger">Cancel</v-btn>
          <v-spacer />
          <v-btn @click="submit" color="primary">Save</v-btn>
        </v-card-actions>
      </slot>
    </v-card>
  </v-dialog>
</template>

<script>
import parameterPicker from '@/components/parameterPicker.vue';
export default {
  name: 'editorDialog',
  components: {
    parameterPicker,
  },
  props: {
    open: { type: Boolean, required: true, default: () => false, },
    fields: { type: Array, required: true, },
    modelValue: { type: Object, required: false, default: () => ({}), },
    title: { type: String, required: false, default: () => 'title', },
    subtitle: { type: String, required: false, default: () => 'subtitle', },
  },
  methods: {
    // reset current value to initial
    reset() {
      this.value = Object.assign({}, this.modelValue);
      this.last_updated = Date.now();
    },
    // close dialog
    dispose() {
      this.$emit('update:open', false);
    },
    // submit value
    submit() {
      // derive copy value
      this.$emit('update:modelValue', Object.assign({}, this.value));
      this.dispose();
    }
  },
  data() {
    return {
      value: Object.assign({}, this.modelValue),
      last_updated: Date.now(),
    }
  }
}
</script>