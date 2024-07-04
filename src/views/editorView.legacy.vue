<template>
  <v-app>
    <!-- templates tab -->
    <template-tab v-model="show_tmpl" />
    <!-- app bar in center -->
    <v-app-bar app flat dark density="compact" color="primary">
      <v-toolbar-title>Editor</v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn icon @click="toggle_param" title="show parameters" :active="!show_param">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn icon @click="toggle_template" title="show templates" :active="!show_tmpl">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <!-- parameter tab -->
    <parameter-tab v-model="show_param" />
    <!-- entity tab -->
    <v-main>
      <v-container fluid>
        <!-- service info -->
        <v-row class="ma-0 pa-1" align-content="stretch">
          <v-col>
            <info-form v-model:value="service" />
          </v-col>
        </v-row>
        <!-- entities -->
        <entity-tab />
      </v-container>
    </v-main>

    <!-- preview dialog -->
  </v-app>
</template>

<script>
// import {  mapWritableState } from 'pinia';
// import {  } from '@/stores/editor';
// import { useServiceStore } from '@/stores/service';

// import editorList from '@/components/editorList.vue';
import infoForm from '@/components/forms/infoForm.vue';
// import previewForm from '@/components/forms/previewForm.vue';
import parameterTab from '@/components/editorTabs/parameterTab.vue';
import templateTab from '@/components/editorTabs/templateTab.vue';
import entityTab from '@/components/editorTabs/entityTab.vue';

import fields from '@/fields';

// import Parameter from '@/models/parameter';

export default {
  name: 'editorPage',
  components: {
    infoForm,
    parameterTab,
    entityTab,
    templateTab,
  },
  methods: {
    toggle_param() {
      this.show_param = !this.show_param;
    },
    toggle_template() {
      this.show_tmpl = !this.show_tmpl;
    },
    add_entity(option) {
      this.entities.push({
      });
    },
    remove_entities(...ents) {
      this.entities = this.entities.filter((e) => !ents.includes(e));
    },

    add_template() {
      this.templates.push({});
    },
    remove_templates(...tmpls) {
      this.templates = this.templates.filter((t) => !tmpls.includes(t));
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
      show_param: true,
      show_tmpl: true,
      // focusing: this.focused,
      elevation: 2,
      service: {},
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