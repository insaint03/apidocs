<template>
  <basis-page title="Editor">
    <template #navigation_menu>
      <v-list-item title="Service" @click="show_service=true" />
      <v-list-item title="Preview" @click="show_preview=true" />
    </template>
    <v-container fluid>
    <v-row class="ma-0 pa-1" align-content="stretch">
      <!-- parameter tab -->
      <editor-list v-model:focusing="focusing" 
        title="parameters" 
        :items="parameters" 
        form="parameter-form" 
        @add="add_parameter" @select="on_parameter=it.name" />
      <editor-list v-model:focusing="focusing" 
        title="entries" 
        :items="entries"
        form="entity-form" />
      <editor-list v-model:focusing="focusing" 
        title="templates" 
        :items="templates"
        form="template-form" />
    </v-row>
    </v-container>


    <!-- system info dialog -->
    <v-dialog v-model="show_service" max-width="600">
      <info-form v-model:value="service" @close="show_service=false" />
    </v-dialog>

    <!-- preview dialog -->
    <v-dialog v-model="show_preview" fullscreen transition="dialog-bottom-transition">
      <preview-form v-model="service" @close="show_preview=false"  />
    </v-dialog>
  </basis-page>
</template>

<script>
// import {  mapWritableState } from 'pinia';
// import {  } from '@/stores/editor';
// import { useServiceStore } from '@/stores/service';

import basisPage from '@/views/basis.vue';
import editorList from '@/components/editorList.vue';
import infoForm from '@/components/forms/infoForm.vue';
import previewForm from '@/components/forms/previewForm.vue';
import fields from '@/fields';

import Parameter from '@/models/parameter';

// import tabs from '@/components/editorTabs';

// const tabnames = tabs.map(tab => tab.title);
// const tab_components = Object.fromEntries(tabs.map(tab => [`${tab.title}Tab`, tab.component]));

export default {
  name: 'editorPage',
  components: {
    // templateBar,
    // editorTab,
    basisPage,
    infoForm,
    previewForm,
    editorList,
    //
    // ...tab_components,
  },
  methods: {
    add_parameter() {
      this.parameters.push(Parameter.create('param'));
    },
  },
  props: {
    focused: {type: String, default: ()=>'entry'},
  },
  computed: {
    // ...mapWritableState(useEditorStore, ['tabs', 'focusing']),
    // ...mapWritableState(useServiceStore, {service: 'info'}),
  },
  data() {
    return {
      fields,
      focusing: 'parameters',
      show_service: false,
      show_preview: false,
      // focusing: this.focused,
      elevation: 2,
      parameters: [],
      entries: [],
      templates: [],
      on_parameter: null,
    };
  }
}
</script>

<style scoped>
.v-col {
  padding-left: 0px;
  padding-right: 0px;

}
.v-col:start {
  padding-left: 4px;
}
.v-col:end {
  padding-right: 4px;
}
</style>