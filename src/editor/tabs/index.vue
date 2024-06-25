<template>
  <v-bottom-navigation v-model="tab" color="primary" grow shift mandatory flat>
    <v-btn v-for="item in editTabs" :key="`tab-nav.${item.key}`" @click="tab=item.key" :value="item.key" :color="$thx.color[item.key]" >
      <v-icon>{{ $thx.icon[item.icon] || `mdi-${item.icon}`  }}</v-icon>
      <span>{{ item.title || item.key }}</span>
    </v-btn>
  </v-bottom-navigation>
  <v-window v-model="tab" style="min-height: 100vh;">
    <v-window-item v-for="item in editTabs" :key="`tab-win.${item.key}`" :value="item.key">
      <component :is="item.component" :model-value="project" />
    </v-window-item>
  </v-window>

</template>
<script>
import Project from '@/models/project';
import tabs from './index.js';

const tab_defaults = 'endpoint';

export default {
  name: 'editView',
  components: {
    ...tabs.components,
  },
  methods: {

  },
  props: {
    project: Project,
    datatypes: Object,
    templates: Object,
    entities: Array,
    endpoints: Object,
    tags: Array,
    timestamp: Number,
  },
  computed: {
    show_datatype_tab() {
      return ['datatypes', 'entities'].includes(this.tab);
    },
    show_template_tab() {
      return ['templates', 'entities'].includes(this.tab);
    },
    
    entity_selected() {
      return this.selected_entity || {
        request: {},
        response: {},
      };
    },

    template_selected() {
      return this.selected_template || {};
    },
  },
  data() {
    return {
      editTabs:tabs.editTabs,
      tab:tab_defaults,
      nav_left: false,
      nav_right: false,

      selected_datatype: null,
      selected_entity: null,
      selected_template: null,
    };
  },
}
</script>