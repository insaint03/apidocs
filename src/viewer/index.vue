<template>
  <!-- nav bar -->
  <v-navigation-drawer v-if="project_ready" app
    location="right">
    <table-of-contents v-bind="info_bindings"/>
  </v-navigation-drawer>
  <v-main app>
    <document-view v-if="project_ready" 
      v-bind="info_bindings"
    />
    <empty-view v-else />
  </v-main>
</template>
<script>
import tableOfContents from './toc.vue';
import documentView from './document.vue';
import emptyView from '@/components/empty.vue';


import { mapActions, mapState } from 'pinia';
import { useProjectStore } from '@/stores/project';

export default {
  name: 'viewerPage',
  components: {
    // emptyView,
    tableOfContents,
    documentView,
    emptyView,
  },
  onMounted() {
  },
  methods: {
    scrolls(e) {
    },
    moment(timestamp) {
      return (new Date(timestamp)).toLocaleString();
    },
    ...mapActions(useProjectStore, [
      'caches',
      'revoke',
      'loads',
      'saves',
      'recovers',
    ]),
  },
  computed: {
    info_bindings() {
      return {
        project: this.project,
        datatypes: this.datatypes,
        templates: this.templates,
        entities: this.entities,
        endpathes: this.endpathes,
        endpoints: this.endpoints,
        tags: this.tags,
        timestamp: this.timestamp,
      }
    },
    ...mapState(useProjectStore, [
      'project',
      'project_ready',
      'datatype_list',
      'datatypes',
      'entities',
      'endpathes',
      'endpoints',
      'tags',
      'templates',
      // 'migrations',
      'timestamp',
      'recents',
    ]),
  },
  data() {
    return {
      open:{
        _about: false,
        _tag: {},
        _datatype: false,
        _endpoint: {},
      },
      // opentabs: [],
      scrollspy: {},

    }
  }
}
</script>