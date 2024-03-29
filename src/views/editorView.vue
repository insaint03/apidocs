<template>
  <basis-page title="Editor">
    <template #navigation_menu>
      <v-list-item title="Service" @click="show_service = true" />
      <v-list-item title="Preview" @click="show_preview = true" />
    </template>
    <v-container fluid>
      <v-row class="ma-0 pa-1" align-content="stretch">
        <!-- parameter tab -->
        <parameter-tab />

        <!-- entity tab -->
        <entity-tab />

        <!-- template tab -->
        <template-tab />
      </v-row>
    </v-container>

    <!-- system info dialog -->
    <v-dialog v-model="show_service" max-width="600">
      <info-form v-model:value="service" @close="show_service = false" />
    </v-dialog>

    <!-- preview dialog -->
    <v-dialog v-model="show_preview" fullscreen transition="dialog-bottom-transition">
      <preview-form v-model="service" @close="show_preview = false" />
    </v-dialog>
  </basis-page>
</template>

<script>
// import {  mapWritableState } from 'pinia';
// import {  } from '@/stores/editor';
// import { useServiceStore } from '@/stores/service';

import basisPage from '@/views/basis.vue';
// import editorList from '@/components/editorList.vue';
import infoForm from '@/components/forms/infoForm.vue';
import previewForm from '@/components/forms/previewForm.vue';
import parameterTab from '@/components/editorTabs/parameterTab.vue';
import entityTab from '@/components/editorTabs/entityTab.vue';
import templateTab from '@/components/editorTabs/templateTab.vue';

import fields from '@/fields';

import Parameter from '@/models/parameter';
// import Request from '@/models/request';
// import Response from '@/models/response';
// import Template from '@/models/template';

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
    // editorList,

    // parameterForm,
    // entityForm,
    // templateForm,
    //
    // ...tab_components,
    parameterTab,
    entityTab,
    templateTab,
  },
  methods: {
    // add_parameter(prefix, basis) {
    //   let item = Parameter.create(prefix || 'parameter',  basis || 'string');
    //   this.parameters.push(item);
    // },
    // remove_parameters(...params) {
    //   this.parameters = this.parameters.filter((p)=>!params.includes(p));
    // },

    add_entity(option) {
      console.log(option);
      this.entities.push({
        // request: new Request(option.request),
        // response: new Response(option.response),
        // templates: option.templates,
      });
    },
    remove_entities(...ents) {
      this.entities = this.entities.filter((e)=>!ents.includes(e));
    },

    add_template() {
      this.templates.push({});
    },
    remove_templates(...tmpls){
      this.templates = this.templates.filter((t)=>!tmpls.includes(t));
    },

  },
  props: {
    focused: { type: String, default: () => 'entry' },
  },
  computed: {
    // ...mapWritableState(useEditorStore, ['tabs', 'focusing']),
    // ...mapWritableState(useServiceStore, {service: 'info'}),
  },
  data() {
    return {
      fields,
      focusing: 'entities',
      show_service: false,
      show_preview: false,
      // focusing: this.focused,
      elevation: 2,
      parameters: [],
      entities: [],
      templates: [],
      on_parameter: null,
      on_entity: null,
      on_template: null,
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