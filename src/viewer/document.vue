<template>
  <v-navigation-drawer location="right" permanent>
    <toc-view v-model:open="open" :scrollspy="scrollspy" />
  </v-navigation-drawer>
  <v-container fluid elevation="1"  id="main">
    <!-- project info -->
    <info-section :project="project" />
    <p>&nbsp;</p>
    <!-- tag types -->
    <tag-section v-for="tmpl in tags" :key="`tag-${tmpl.tagname}`"
      :tag="tmpl" 
      :entities="entities.filter((e)=>e.affiliated(tmpl.name))"/>
    <p>&nbsp;</p>
    <!-- datatypes -->
    <datatype-section v-for="dt in datatype_references" :key="`datatype-${dt.name}`"
      :datatype="dt" />
    <p>&nbsp;</p>
    <endpoint-section v-for="ep, ei in endpathes" :key="`endpoint-${ei}.${ep}`"
      :endpath="ep" :endpoints="endpoints[ep]" />
    <p>&nbsp;</p>
  </v-container>
</template>
<script>
import { mapState } from 'pinia';
import { useProjectStore } from '@/stores/project';

import tocView from './toc.vue';


import Project from '@/models/project';
import sections from './section';
// import Tags from './tags.vue';
export default {
  name: 'viewerDocument',
  methods: {
    tooltip_selector(cls, name) {
      return `.tooltip[href="#/${cls}/${name}/"]`;
    }
  },
  components: {
    tocView,

    ...sections,
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
    datatype_references() {
      return Object.values(this.datatypes).filter((d)=>d.items
      );
    },
    ...mapState(useProjectStore, [
      'endpathes',
      'tag_datatypes',
      'tag_entities',
      'migrations',
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
      scrollspy: {},
    };
  }
}
</script>
<style>
.heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tooltip-card {
  min-width: 12.5vw; 
  min-height: 12.5vh; 
  background-color: inherit; 
  color: inherit;
}
</style>