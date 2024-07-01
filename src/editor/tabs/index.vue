<template>
  <!-- main window -->
  <v-window v-model="tab" style="min-height: 100vh;">
    <v-window-item v-for="item in editTabs" :key="`tab-win.${item.key}`" :value="item.key">
      <component :is="item.component" />
    </v-window-item>
  </v-window>

  <!-- left navigation on datatypes -->
  <datatype-nav v-model:show="show_datatype_tab" />
  <!-- right navigation on templates -->
  <template-nav :model-value="show_template_tab" />
  <!-- bottom for tab -->
  <v-bottom-navigation v-model="tab" color="primary" grow shift mandatory>
    <v-btn v-for="item in editTabs" :key="`tab-nav.${item.key}`" @click="tab=item.key" :value="item.key" :color="$thx.color[item.key]" >
      <v-icon>{{ $thx.icon[item.icon] || `mdi-${item.icon}`  }}</v-icon>
      <span>{{ item.title || item.key }}</span>
    </v-btn>
  </v-bottom-navigation>
</template>
<script>
import { mapWritableState, mapActions } from 'pinia';
import { useProjectStore } from '@/stores/project';
import { useDatatypeStore } from '@/stores/datatype';

import Project from '@/models/project';
import tabs from './index.js';

import datatypeNav from '@/editor/components/datatypeTab.vue';
import templateNav from '@/editor/components/templateTab.vue';

const tab_defaults = 'endpoint';

export default {
  name: 'editView',
  components: {
    datatypeNav,
    templateNav,
    ...tabs.components,
  },
  methods: {

  },
  watch: {
  },
  props: {
    // project: Project,
    // datatypes: Object,
    // templates: Object,
    // entities: Array,
    // endpoints: Object,
    // tags: Array,
    // timestamp: Number,
  },
  computed: {
    show_datatype_tab() {
      return ['datatype', 'endpoint'].includes(this.tab);
    },
    show_template_tab() {
      return ['template', 'endpoint'].includes(this.tab);
    },
    
    entity_selected() {
      return this.selected_entity || {
        request: {},
        response: {},
      };
    },

    ...mapWritableState(useProjectStore, [
      'project',
      'datatypes',
      'templates',
      'entities',
      'endpoints',
      'tags',
      'timestamp',
    ]),
    ...mapWritableState(useDatatypeStore, {
      selected_datatype: 'selection',
    }),
  },
  data() {
    return {
      editTabs:tabs.editTabs,
      tab:tab_defaults,
      nav_left: false,
      nav_right: false,

      // selected_datatype: [],
      selected_entity: null,
      selected_template: null,
    };
  },
}
</script>