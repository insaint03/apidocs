<template>
  <!-- topmost appbar -->
  <v-app-bar app flat density="compact">
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-app-bar-nav-icon v-bind="props" />
      </template>
      <!-- list -->
      <v-list>
        <v-list-item disabled title="upload data..." />
        <v-divider />
        <v-list-item disabled title="export as swagger..." />
        <v-list-item disabled title="export migration..." />
      </v-list>
    </v-menu>
    <v-toolbar-title>{{ service.title || 'APIdocs' }}</v-toolbar-title>
    <v-toolbar-items>
      <v-btn icon @click="toggle_dataype_tab" :disabled="!show_datatype_tab" :active="nav_left">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
      <v-btn icon @click="toggle_template_tab" :disabled="!show_template_tab" :active="nav_right">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
  <!-- bottom navigation -->
  <v-bottom-navigation v-model="tab" color="primary" grow shift mandatory flat>
    <v-btn v-for="item in tabs" :key="`tab-nav.${item}`" @click="tab = item" :value="item" :color="tabitems[item].color || 'default'" >
      <v-icon>{{ tabitems[item].icon }}</v-icon>
      <span>{{ tabitems[item].title }}</span>
    </v-btn>
  </v-bottom-navigation>


  <!-- main area window controlled by bottom navigation -->
  <v-main app>
  <!-- left navbar area/datatype -->
    <datatype-tab v-if="show_datatype_tab" v-model="nav_left" @select="on_select_params" />

    <v-container fluid>
      <v-window v-model="tab">
        <v-window-item value="info">
          <edit-info v-model="service" />
        </v-window-item>
        <v-window-item value="datatypes">
          <edit-datatype v-model="datatype_selected" :disables="disabled_datatype_props" />
        </v-window-item>
        <v-window-item value="entities">
          <edit-entity v-model="entity_selected" />
        </v-window-item>
        <v-window-item value="templates">
          <edit-template v-model="template_selected" />
        </v-window-item>
        <v-window-item value="viewer">
          <edit-viewer v-bind="{service, datatypes, entities, templates}"  />
        </v-window-item>
      </v-window>
    </v-container>
  <!-- right navbar area/templates -->
    <template-tab v-if="show_template_tab" v-model="nav_right" />
  </v-main>
  


</template>

<script>
// import Service from '@/models/service'
// import Parameter from '@/models/parameter'
// import Template from '@/models/template'

import Request from '@/models/request'
import Response from '@/models/response'
import editors from './editor'
import fields from '@/fields'

import { mapWritableState } from 'pinia'
import { useServiceStore } from '@/stores/service'


const tabs = [
  'info',
  'datatypes',
  'entities',
  'templates',
  'viewer',
];
const tabitems = {
  info: {
    icon: 'mdi-information',
    title: 'Info',
    is: editors.editInfo,
    color: 'info',
  },
  datatypes: {
    icon: 'mdi-database',
    title: 'Data Types',
    color: 'secondary',
  },
  entities: {
    icon: 'mdi-database',
    title: 'Entities',
    color: 'primary',
  },
  templates: {
    icon: 'mdi-file-document',
    title: 'Templates',
    color: 'warning',
  },
  viewer: {
    icon: 'mdi-eye',
    title: 'Viewer',
    color: 'success',
  },
};
const tab_defaults = 'entities';

const fields_datatype = fields.parameters.map((f)=>f.key)
  .concat(fields.parameter_desc.map((f)=>f.key));

export default {
  name: 'editorView',
  components: {
    ...editors
  },
  methods: {
    toggle_dataype_tab() {
      this.nav_left = !this.nav_left;
    },
    toggle_template_tab() {
      this.nav_right = !this.nav_right;
    },

    add_datatype() {
      this.datatypes.push(Object.assign({}, this.datatype_selected));
    },
    add_entity() {
      this.entities.push(Object.assign({}, this.entity_selected));
    },
    add_template() {
      this.templates.push(Object.assign({}, this.template_selected));
    },

    on_select_params(params) {
      // set selected datatype
      let disables = [];
      this.selected_datatype = params.reduce((agg,it)=>{
        fields_datatype.forEach((fk)=>{
          if(agg[fk] === undefined) {
            agg[fk] = it[fk];
          } else if(agg[fk]!=it[fk]) {
            agg[fk] = null;
            disables.push(fk);
          } 
          return agg;
        })
      }, {});
      // move to datatype tab
      this.tab = 'datatypes';
    }
  },
  computed: {
    show_datatype_tab() {
      return ['datatypes', 'entities'].includes(this.tab);
    },
    show_template_tab() {
      return ['templates', 'entities'].includes(this.tab);
    },

    datatype_selected() {
      return this.selected_datatype || {};
    },

    entity_selected() {
      return this.selected_entity || {
        request: new Request(),
        response: new Response(),
      };
    },

    template_selected() {
      return this.selected_template || {};
    },

    ...mapWritableState(useServiceStore, [
      'service',
      'parameters',
      'templates',
      'entities',
    ]),
  },
  data() {
    return {
      tabs,
      tabitems,

      // concurrent focusing tab
      tab: tab_defaults,
      // side navigation drawers
      nav_left: true,
      nav_right: true,

      // 
      // info: {},
      // service: new Service(),
      // parameters: [],
      // entities: [],
      // templates: [],

      // selected items
      selected_datatype: null,
      disabled_datatype_props: [],
      selected_entity: null,
      selected_template: null,
    }
  },
}
</script>