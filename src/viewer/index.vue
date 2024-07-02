<template>
  <!-- nav bar -->
  <v-navigation-drawer v-if="project_ready" app
    location="right" permanent>
    <table-of-contents />
  </v-navigation-drawer>
  <v-main app>
    <document-view v-if="project_ready" 
      :project="project"
      :datatypes="datatypes"
      :templates="templates"
      :entities="entities"
      :endpoints="endpoints"
      :tags="tags"
      :timestamp="timestamp"
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
      console.log('scroll', e, arguments);
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
      'tag_datatypes',
      'tag_entries',
      'migrations',
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