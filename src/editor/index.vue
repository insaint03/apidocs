<template>
  <v-main app>
    <edit-view v-if="project_ready" :init_tab="tab" />
    <empty-view v-else />
  </v-main>
</template>
<script>
import { mapActions, mapState } from 'pinia';
import { useProjectStore } from '@/stores/project';

import editView from './tabs/index.vue';
import emptyView from '@/components/empty.vue';



export default {
  name: 'editorPage',
  components: {
    editView,
    emptyView,
    
  },
  mounted() {
    this.initialize(this.location);
  },
  methods: {
    ...mapActions(useProjectStore, [
      'initialize',
      'caches',
      'revoke',
      'loads',
      'saves',
      'recovers',
    ]),
  },
  props: {
    location: {
      type: String,
      required: false,
      default: null,
    },
    tab: {
      type: String,
      required: false,
    }
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