<template>
  
  <v-container fluid elevation="1"  id="main">
    <!-- project info -->
    <info-section :project="project" />
    <p>&nbsp;</p>
    <!-- tag types -->
    <h2 id="/tag/" :color="$thx.color.tag">/tags/</h2>
    <tag-section v-for="tmpl in tags" :key="`tag-${tmpl.tagname}`"
      :tag="tmpl" 
      :entities="entities.filter((e)=>e.affiliated(tmpl.name))"/>
    <p>&nbsp;</p>
    <!-- datatypes -->
    <h2 id="/datatype/" :color="$thx.color.datatype">/datatypes/</h2>
    <datatype-section v-for="dt in datatype_references" :key="`datatype-${dt.name}`"
      :datatype="dt" />
    <p>&nbsp;</p>
    <!-- endpoints -->
    <h2 id="/endpoint/" :color="$thx.color.api">/endpoints/</h2>
    <template v-for="(ep, ei) in endpathes" :key="`endpoint-${ei}.${ep}`">
      <h3 :id="`/endpoint${ep}`">
        <v-btn flat icon readonly :title="`${ep}`">
          <v-icon :color="$thx.color.endpoint">{{ $thx.icon.endpoint }}</v-icon>
        </v-btn>
        {{ ep }}
      </h3>
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
      return Object.values(this.datatypes)
          // not starting with underscore, include namespace
          .filter((d)=>!/^_/.test(d.name) && !/^_/.test(d.localname))
          .filter((d)=>d.items!=null);
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