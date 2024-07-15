<template>
  
  <v-container fluid elevation="1"  id="main">
    <!-- project info -->
    <info-section :project="project" />
    <p>&nbsp;</p>
    <!-- tag types -->
    <v-toolbar flat :color="$thx.color.template" id="/tag/">
      <v-toolbar-title>
        <v-icon>{{ $thx.icon.tag }}</v-icon>
      </v-toolbar-title>
    </v-toolbar>
    <tag-section v-for="tmpl in tags" :key="`tag-${tmpl.tagname}`"
      :tag="tmpl" 
      :entities="entities.filter((e)=>e.affiliated(tmpl.name))"/>
    <p>&nbsp;</p>
    <!-- datatypes -->
    <v-toolbar flat :color="$thx.color.datatype" id="/datatype/">
      <v-toolbar-title>
        <v-icon>{{ $thx.icon.datatype }}</v-icon>
      </v-toolbar-title>
    </v-toolbar>
    <datatype-section v-for="dt in datatype_references" :key="`datatype-${dt.name}`"
      :datatype="dt" />
    <p>&nbsp;</p>
    <!-- endpoints -->
    <v-toolbar flat :color="$thx.color.endpoint" id="/endpoint/">
      <v-toolbar-title>
        <v-icon>{{ $thx.icon.endpoint }}</v-icon>
      </v-toolbar-title>
    </v-toolbar>
    <template v-for="(ep, ei) in endpathes" :key="`endpoint-${ei}.${ep}`">
      <h2 :id="`/endpoint${ep}`" class="border-b-thin">
        <v-btn flat icon readonly :title="`${ep}`">
          <v-icon :color="$thx.color.endpoint">{{ $thx.icon.endpoint }}</v-icon>
        </v-btn>
        {{ ep }}
      </h2>
      <template v-for="eps,epi in endpoints[ep]" :key="`endpoint-${ei}.${ep}-${epi}`">
        <endpoint-section  v-bind="eps" />
      </template>
    <p>&nbsp;</p>
      

    </template>
  </v-container>
</template>
<script>
// import { mapState } from 'pinia';
// import { useProjectStore } from '@/stores/project';
import models from '@/models';

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
    // tocView,

    ...sections,
  },
  props: {
    project: Project,
    datatypes: Object,
    templates: Object,
    entities: Array,
    // endpoints: Object,
    // endpathes: Array,
    // tags: Array,
    timestamp: Number,
  },
  computed: {
    tags(){
      return models.get_tags({templates: this.templates});
    },
    endpoints() {
      return models.get_endpoints({entities: this.entities});
    },
    endpathes() {
      return models.get_endpathes({endpoints: this.endpoints});
    },
    datatype_references() {
      return Object.values(this.datatypes).filter((d)=>d.items!=null);
    },
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