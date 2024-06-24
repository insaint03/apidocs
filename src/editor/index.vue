<template>
  <v-main app>
    <edit-view v-if="project_ready" 
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
import { mapActions, mapState } from 'pinia';
import { useProjectStore } from '@/stores/project';

import appBar from '@/components/appbar.vue';
import editView from './tabs/index.vue';
import emptyView from '@/components/empty.vue';



export default {
  name: 'editorPage',
  components: {
    appBar,
    editView,
    emptyView,
    
  },
  methods: {
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
      'datatypes',
      'templates',
      'entities',
      'endpoints',
      'tags',
      'timestamp',
      'project_ready',
    ]),
  },


}
</script>