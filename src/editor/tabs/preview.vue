<template>
    <document-view
      :project="project"
      :datatypes="datatypes"
      :templates="templates"
      :entities="entities"
      :endpoints="endpoints"
      :tags="tags"
      :timestamp="timestamp" />
</template>
<script>
import { mapState } from 'pinia';
import { useProjectStore } from '@/stores/project';

import documentView from '@/viewer/document.vue';

export default {
  name: 'previewTab',
  components: {
    documentView,
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
    ]),
  },
  data() {
    return {

    };
  }
}

</script>