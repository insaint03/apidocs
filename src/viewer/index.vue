<template>
  <emptyView v-if="!project_ready" />
  <viewer v-else />
</template>
<script>
import models from '@/models'
import emptyView from './empty.vue';
import viewer from './viewer.vue';

import { mapWritableState } from 'pinia';
import { useProjectStore } from '@/stores/project';

export default {
  name: 'viewerPage',
  components: {
    emptyView,
    viewer,
  },
  methods: {
    async load(path) {
      const content = await models.loads(path);
      this.project = content.project;
      this.datatypes = content.datatypes;
      this.templates = content.templates;
      this.entities = content.entities;
    },
  },
  computed: {
    ...mapWritableState(useProjectStore, [
      'project_ready',
    ]),
  },
  data() {
    return {
      project: {},
      datatypes: {},
      templates: {},
      entities: [],
    }
  }
}
</script>