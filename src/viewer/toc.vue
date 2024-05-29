<template>
  <v-list v-model:opened="opentabs">
    <!-- project info -->
    <v-list-subheader>about the project</v-list-subheader>
    <v-list-item :title="project.name" :subtitle="project.version" />
    <v-divider />
    <!-- by tag definition -->
    <template v-for="tag in tagnames" :key="`toc.tag-${tag.tagname}`">
      <v-list-group :value="tag.tagname">
        <template #activator="{ props }">
          <v-list-item :title="tag.tagname" v-bind="props">
            {{ tag }}
          </v-list-item>
        </template>
        <v-list-subheader>datatype</v-list-subheader>
        <v-list-item v-for="tp in tag.datatypes" :key="`toc.tag-${tag.tagname}-${tp}`">
          <v-list-item-title>{{ tp.title }}</v-list-item-title>
        </v-list-item>
        <v-list-subheader>endpoints</v-list-subheader>
        <v-list-item v-for="tp in tag.apis" :key="`toc.tag-${tag.tagname}-${tp}`"></v-list-item>
      </v-list-group>
    </template>
    <v-divider />
    <!-- datatypes -->
    <v-list-group value="datatypes" v-if="has_datatypes">
      <template #activator="{ props }">
        <v-list-subheader v-bind="props">datatypes</v-list-subheader>
      </template>
      <v-list-item v-for="tp in datatypes" :key="`toc.datatypes-${tp.name}`"
        :title="tp.name" :subtitle="tp.basistype"></v-list-item>
    </v-list-group>
    <v-divider />
    <!-- apis -->
    <v-list-group value="apis" v-if="has_entities">
      <template #activator="{ props }">
        <v-list-subheader v-bind="props">apis</v-list-subheader>
      </template>
      <v-list-item v-for="(e,ei) in entities" :key="`toc.apis-${ei}`">
        <v-list-item-title>[{{ e.request.method }}] {{ e.request.path }}</v-list-item-title>
      </v-list-item>
    </v-list-group>
  </v-list>
</template>

<script>
import { mapState } from 'pinia';
import { useProjectStore } from '@/stores/project';

export default {
  name: 'tocViewer',
  props: {
    open: Array,
    scrollspy: Object,
  },
  computed: {
    ...mapState(useProjectStore, [
      'project', 
      'datatypes',
      'templates',
      'entities', 

      'tagnames',
      'has_datatypes',
      'has_entities',
    ]),
  },
  data() {
    return {
      opentabs: this.open || [],
      scrolls: this.scrollspy,
    };
  }
}
</script>