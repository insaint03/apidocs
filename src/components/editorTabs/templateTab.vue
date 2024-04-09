<template>
  <v-navigation-drawer :model-value="modelValue" location="right" :key="`editor-templates.${last_updated}`" permanent>
    <v-list-subheader>templates</v-list-subheader>
    <v-list-item title="Add" append-icon="mdi-plus" @click="add_new" />
    <v-divider />
    <v-tooltip v-for="tmp, ti in templates" :key="`template-${tmp.name}.${ti}`">
      <template #activator="{props}">
        <v-list-item v-bind="props" :title="tmp.name" icon="mdi-pencil" @click="on_template = ti" />
      </template>
    </v-tooltip>
  </v-navigation-drawer>

  <!-- modal -->
  <modal-form v-model="selected" :show="selected!=null">
    <base-form :fields="fields" v-model="selected">
    </base-form>
  </modal-form>
</template>
<script>
import fields from '@/fields'
import { mapWritableState } from 'pinia';
import { useEditorStore } from '@/stores/editor';
import { useServiceStore } from '@/stores/service';

import modalForm from '@/components/forms/modalForm.vue';
import baseForm from '@/components/forms/baseForm.vue';


export default {
  name: 'templateTab',
  components: {
    modalForm,
    baseForm,
  },
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    add_new() {
      this.templates.push(Object.assign({}, this.generate));
      // this.generate = null;
    },
    add_cancel() {
      this.generate = null;
    },
    generate_item() {
      this.generate = {};
    }
  },
  computed: {
    the_template: {
      get() { return this.templates[this.on_template]; },
      set(v) { this.on_template = v.name; },
    },
    selected: {
      get() { return this.templates[this.on_template]; },
      set(v) { 
        if(v!=null) {
          this.templates[this.on_template] = v;
        } else {
          this.on_template = null;
        }
       },
    },
    ...mapWritableState(useServiceStore, ['templates']),
    ...mapWritableState(useEditorStore, ['on_template']),
  },
  data() {
    return {
      fields: fields.templates,
      generate: {
        name: 'new_template',
      },
      last_updated: Date.now(),
    };
  },
}
</script>