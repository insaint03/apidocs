<template>
  <form-card>
    <template #title>
      <v-toolbar-title>{{ value.name }}</v-toolbar-title>
      <v-chip color="accent">{{ value.basistype }}</v-chip>
    </template>

    <base-form v-model="value" :fields="fields">
      <template #item-items v-if="value.is_array">
        <v-select v-model="value.items" multiple :items="alltypes" item-title="name" item-value="name" label="item types" placeholder="any"/>
      </template>
      <template #item-items v-else-if="value.is_object">
        <v-data-table :items="value.items" />
      </template>
      <template #item-items v-else><v-divider /></template>
    </base-form>
  </form-card>
</template>

<script>
import Parameter from '@/models/parameter';
import formCard from './formCard.vue';
import baseForm from './baseForm.vue';

const parameterFields = [ 
  { key: 'name', label: 'Name', required: true, cols: 5 },
  { key: 'basistype', label: 'BaseType', required: true, is: 'parameter-picker', items: Parameter.all, itemTitle: 'name', itemValue: 'name', cols: 6 },
  { key: 'summary', label: 'Summary', required: true },
  { key: 'description', label: 'Description', required: false },
  { key: 'validation', label: 'Validation', required: false },
  { key: 'items', label: 'Items', required: false },
  { key: 'samples', label: 'Samples', required: false },
];

export default {
  name: 'parameterForm',
  components: {
    formCard,
    baseForm,
  },
  methods: {
    remove() {
      this.$emit('remove');
    },
  },
  props: {
    modelValue: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    readonly: {
      type: Boolean,
      required: false,
      default: ()=>false,
    }
  },
  computed: {
    alltypes() {
      return Parameter.all;
    },
  },
  data() {
    return {
      value: this.modelValue,
      fields: parameterFields,
    }
  }
}
</script>