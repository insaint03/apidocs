<template>
  <basis-page title="Editor">
    <template #navigation_menu>
      <v-list-item title="Service" @click="show_service=true" />
      <v-list-item title="Preview" @click="show_preview=true" />
    </template>
    <v-row :key="`editor-tab.${focusing}`">
      <parameter-tab  />
      <entity-tab  />
      <template-tab  />
    </v-row>

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
import { mapState, mapWritableState } from 'pinia';
import { useEditorStore } from '@/stores/editor';
import { useServiceStore } from '@/stores/service';

import basisPage from '@/views/basis.vue';
import infoForm from '@/components/forms/infoForm.vue';
import previewForm from '@/components/forms/previewForm.vue';

import tabs from '@/components/editorTabs';

// import datatypeTab from '@/components/editorTabs/datatypeTab.vue';
// import entityTab from '@/components/editorTabs/entityTab.vue';
// import templateTab from '@/components/editorTabs/templateTab.vue';
const tabnames = tabs.map(tab => tab.title);
const tab_components = Object.fromEntries(tabs.map(tab => [`${tab.title}Tab`, tab.component]));

export default {
  name: 'editorPage',
  components: {
    // templateBar,
    // editorTab,
    basisPage,
    infoForm,
    previewForm,
    //
    ...tab_components,
  },
  props: {
    focused: {type: String, default: ()=>'entry'},
  },
  computed: {
    ...mapState(useEditorStore, ['tabs', 'focusing']),
    ...mapWritableState(useServiceStore, {service: 'info'}),
  },
  data() {
    return {
      show_service: false,
      show_preview: false,
      // focusing: this.focused,
      elevation: 2,
      templates: [],
      parameters: [],
      entries: [],
      requests: [],
      responses: [],
    };
  }
}
</script>