<template>
  <editor-tab title="templates">
    <template #unfocused>
      <editor-list v-model="templates" title="templates">
      </editor-list>
    </template>

    <!-- default slot-->
    <template-form v-model="editing.template">
    </template-form>

    <template #actions>
      <v-card-actions>
        <v-btn @click="generate_item">NEW</v-btn>
      </v-card-actions>
      <new-dialog title="new template" @submit="add_new" @cancel="add_cancel" v-model="generate">
        <v-text-field v-model="generate.name" label="Name" required />
      </new-dialog>
    </template>

  </editor-tab>
</template>
<script>
// import Template from '@/models/template';
import { mapWritableState } from 'pinia';
import { useEditorStore } from '@/stores/editor';
import { useServiceStore } from '@/stores/service';

import editorTab from '@/components/editorTabs/editorTab.vue';
import editorList from '@/components/editorList.vue';
import templateForm from '@/components/forms/templateForm.vue';
import newDialog from '@/components/newDialog.vue';

export default {
  name: 'templateTab',
  components: {
    editorTab,
    editorList,
    templateForm,
    newDialog,
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
      get() { return this.editing.template; },
      set(v) { this.editing.template = v; },
    },
    ...mapWritableState(useServiceStore, ['templates']),
    ...mapWritableState(useEditorStore, ['editing']),
  },
  data() {
    return {
      generate: null,
    };
  },
}
</script>