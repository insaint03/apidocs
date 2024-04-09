<template>
  <v-navigation-drawer :model-value="modelValue" location="left" :key="`editor-parameters.${last_updated}`" permanent>
    <!-- editor list region (left) -->
    <v-list-subheader>{{ title }}</v-list-subheader>
    <v-list-item title="Add" subtitle="String" append-icon="mdi-plus" @click="add_new" />
    <v-divider />
    <v-tooltip v-for="param, pi in parameters" :key="`param-${param.name}.${param.basistype}_${pi}`">
      <template #activator="{props}">
        <v-list-item v-bind="props" :title="param.name" :subtitle="param.basistype" icon="mdi-pencil" @click="select(param)" />
      </template>
      {{ param.name }} [{{ param.basistype }}]
    </v-tooltip>
    <v-spacer />
    <v-divider />
    <v-tooltip>
      <template #activator="{ props }">
        <v-list-item v-bind="props" title="_default" subtitle="" @click="set_defaults=true" />
      </template>
      Defaul parameter creation name prefix, and basis type setting.
    </v-tooltip>
  </v-navigation-drawer>

  <!-- modal -->
  <modal-form v-model="selected" v-model:show="edits">
    <base-form :fields="fields" v-model="selected">
      <template #item-items>
        <parameter-picker v-if="selected.is_array" v-model="selected.items" chips multiple />
        <table-values v-else-if="selected.is_object" v-model="selected.items" :fields="item_fields">
          <template #value-required="{value}">
            <v-icon>{{ value ? 'mdi-check' : '' }}</v-icon>
          </template>
          <template #item-datatype="{ item }">
            <parameter-picker v-model="item.datatype" />
          </template>
          <template #item-required="{ item }">
            <v-checkbox v-model="item.required" label="required" />
          </template>
        </table-values>
        <v-divider v-else />
      </template>
    </base-form>
  </modal-form>
  <modal-form v-model="generate" :fields="generate_fields" v-model:show="set_defaults" />
</template>

<script>
import Parameter from '@/models/parameter';
import { mapWritableState } from 'pinia';
import { useServiceStore } from '@/stores/service';
import { useEditorStore } from '@/stores/editor';

import modalForm from '@/components/forms/modalForm.vue';
import baseForm from '@/components/forms/baseForm.vue';
import parameterPicker from '@/components/inputFields/parameterPicker.vue';
import tableValues from '@/components/inputFields/tableValues.vue';

// import editorTab from '@/components/editorTabs/editorTab.vue';
// import editorList from '@/components/editorList.vue';
import fields from '@/fields'

const title = 'parameters';

export default {
  name: 'parameterTab',
  components: {
    modalForm,
    baseForm,

    parameterPicker,
    tableValues,

  },
  props: {
    modelValue: {
      type: Boolean,
      required: false,
      default: true,
    }
  },
  methods: {
    select(item) {
      this.selected = item;
      this.last_updated = Date.now();
    },
    add_new() {
      let item = Parameter.create(
        this.default_name,
        this.default_basis,
      );
      this.parameters.push(item);
      this.last_updated = Date.now();
      // this.select(item);
    },
    remove() {
      this.parameters = this.parameters.filter(dt => dt != this.the_parameter);
      // this.the_parameter = null;
    }
  },
  computed: {
    default_name() { return this.generate.name || 'param'},
    default_basis() { return this.generate.basis || 'string'},

    activated() {
      return this.focusing === title;
    },
    cols() {
      return this.activated ? 8 : 2;
    },
    alltypes() {
      return Parameter.all;
    },
    edits: {
      get() { return this.selected != null; },
      set(v) { if(v===false) { this.selected = null; } },
    },
    ...mapWritableState(useEditorStore, ['focusing', 'on_parameter']),
    ...mapWritableState(useServiceStore, ['parameters']),
  },
  data() {
    return {
      show: true,
      title,
      fields: fields.parameters,
      selected: null,
      generate: {
        name: 'param',
        basistype: 'string',
      },
      generate_fields: fields.parameters
        .filter((pf) => pf.required)
        .map((pf) => Object.assign({}, pf, { cols: 12 })),
      item_fields: fields.items,
      set_defaults: false,
      last_updated: Date.now(),
      // primitives: Parameter.primitives,
    };
  },
}
</script>

<style scoped>
.editor-list {
  width: 100%;
  min-width: 13.5vw;
  height: 70vh;
  overflow-y: auto;
}

.editor-form {
  max-width: 50vw;
}
</style>