<template>
  <v-dialog :model-value="show">
    <v-card>
      <v-card-item @click="dispose">
        <v-card-title>{{ value.name || '_parameter' }}</v-card-title>
        <v-card-subtitle><v-chip>{{ value.basistype || '_datatype' }}</v-chip></v-card-subtitle>
      </v-card-item>
      <base-form :fields="fields" v-model="value" :key="`param-modal.updated-${last_updated}`">
        <!-- items setup -->
        <template #item-items="{ item }">
          <!-- on object derivative -->
          <table-values v-if="item.is_object" v-model="value.items" :fields="item_fields">
            <template #value-required="{ item }">
              <v-icon>{{ item ? 'mdi-check' : '' }}</v-icon>
            </template>
            <template #item-datatype="{ item }">
              <parameter-picker v-model="item.basistype" />
            </template>
            <template #item-required="{ item }">
              <v-checkbox v-model="item.required" label="required" />
            </template>
          </table-values>
          <!-- an array derivative -->
          <parameter-picker v-else-if="item.is_array" v-model="item.items" chips multiple />
          <!-- others -->
          <v-divider v-else />
        </template>
        <!-- samples setup -->
        <template #item-samples="{ item }">
          <!-- an object derivative -->
          <table-values v-if="item.is_object" v-model="item.samples" :fields="item.items">
          </table-values>
          <!-- others -->
          <table-values v-else="item.is_array" v-model="item.samples" :fields="[{ key: 'value', required: true }]">
          </table-values>
        </template>
      </base-form>
      <v-card-actions>
        <v-btn text @click="dispose">Close</v-btn>
        <v-spacer />
        <v-btn text @click="remove">Remove</v-btn>
        <v-btn text @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
// import Parameter from '@/models/parameter';
// import formCard from './formCard.vue';
// import modalForm from '@/components/forms/modalForm.vue';
import baseForm from '@/components/forms/baseForm.vue';
import fields from '@/fields.js';
import parameterPicker from '@/components/inputFields/parameterPicker.vue';
import tableValues from '@/components/inputFields/tableValues.vue';

export default {
  name: 'parameterForm',
  components: {
    // formCard,
    // modalForm,
    baseForm,
    parameterPicker,
    tableValues,
  },
  methods: {
    remove() {
      this.$emit('remove');
    },
    dispose() { this.$emit('update:show', false); },
    reset() { this.value = Object.assign({}, this.modelValue); },
    save() {
      this.$emit('update:modelValue', this.value);
      this.dispose();
    }
  },
  props: {
    modelValue: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    show: {
      type: Boolean,
      required: false,
      default: () => false,
    },
  },
  watch: {
    // value() { 
    //   this.last_updated = Date.now();
    // },
    // show() {
    //   this.last_updated = Date.now();
    // }
  },
  data() {
    return {
      value: Object.assign({}, this.modelValue),
      fields: fields.parameters,
      item_fields: fields.items,
      last_updated: Date.now(),
    }
  }
}
</script>