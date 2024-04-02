<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <template #title>
        {{  value.title || 'Service' }}
        <v-spacer />
        <v-chip>{{ value.version || 'v' }}</v-chip>
      </template>
      <template #text>
        <base-form v-model="value" :fields="fields">
        </base-form>
      </template>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import fields from '@/fields';
import baseForm from '@/components/forms/baseForm.vue';

export default {
  name: 'infoDialog',
  components: {
    baseForm,
  },
  props: {
    modelValue: {
      type: Object,
      required: false,
      default: ()=>({}),
    },
  },
  methods: {
    dispose() {
      this.$emit('close', false);
    },
    submit() {
      // update the value then dispose
      this.$emit('update:modelValue', this.value);
      this.dispose();
    }
  },
  data() {
    return {
      fields: fields.service,
      value: this.modelvalue || {},
    }
  },
}
</script>