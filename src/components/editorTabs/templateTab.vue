<template>
  <v-navigation-drawer :model-value="true" location="right" :key="`editor-templates.${last_updated}`" permanent>
    <v-list-subheader>{{ title }}</v-list-subheader>
    <v-list-item title="Add" append-icon="mdi-plus" @click="generate_item" />
    <v-divider />
    <v-tooltip v-for="tmp, ti in templates" :key="`template-${tmp.name}.${ti}`">
      <template #activator="{props}">
        <v-list-item v-bind="props" :title="tmp.name" icon="mdi-pencil" @click="the_template = tmp" />
      </template>
    </v-tooltip>
  </v-navigation-drawer>
</template>
<script>
// import Template from '@/models/template';
import { mapWritableState } from 'pinia';
import { useEditorStore } from '@/stores/editor';
import { useServiceStore } from '@/stores/service';


export default {
  name: 'templateTab',
  components: {
  },
  methods: {
    add_new() {
      this.templates.push(this.generate);
      this.generate = null;
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
    ...mapWritableState(useServiceStore, ['templates']),
    ...mapWritableState(useEditorStore, ['on_template']),
  },
  data() {
    return {
      generate: null,
    };
  },
}
</script>