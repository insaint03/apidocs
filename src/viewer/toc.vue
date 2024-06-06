<template>
  <v-list v-model:opened="opentabs" v-if="project!=null">
    <!-- project info -->
    <v-list-subheader>about the project</v-list-subheader>
    <v-list-item :title="project.name" :subtitle="project.version" @click="hash('about')" />
    <v-divider />
    <!-- by tag definition -->
    <v-list-subheader>by tag</v-list-subheader>
    <v-list-item v-for="tmpl in tags" :key="`toc.tag-${tmpl.tagname}`"
      :title="tmpl.tagname" :subtitle="tmpl.summary"
      @click="move(tmpl)" 
    />
    <v-divider />
    <!-- TODO::migration 
    <v-list-group value="migrations">
      <template #activator="{ props }">
        <v-list-item v-bind="props" title="migrations" />
      </template>
      <v-list-item v-for="m in migrations" :key="`toc.mig-${m.migration}`" :title="m.name" :subtitle="m.migration" />
    </v-list-group>
    -->
    <v-divider />
    <!-- datatypes -->
    <v-list-group value="datatypes">
      <template #activator="{ props }">
        <v-list-item v-bind="props" title="datatypes" />
      </template>
      <v-list-item v-for="tp in datatype_list" :key="`toc.datatypes-${tp.name}`"
        @click="move(tp)"
        :title="tp.name" :subtitle="tp.basistype"></v-list-item>
    </v-list-group>
    <v-divider />
    <!-- apis -->
    <v-list-group value="apis">
      <template #activator="{ props }">
        <v-list-item v-bind="props" title="apis"></v-list-item>
      </template>
      <v-list-item v-for="(e,ei) in entities" :key="`toc.apis-${ei}`"
        @click="move(e)">
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
  methods: {
    hash(ref) {
      window.location.hash = `#${ref}`;
    },
    move(ref) {
      this.hash(ref.el || ref);
      // const el = document.getElementById(id);
      // if (el) {
      //   el.scrollIntoView({ behavior: 'smooth' });
      // }
    }
  },
  computed: {
    ...mapState(useProjectStore, [
      'project', 
      'datatype_list',
      'templates',
      'entities', 
      'migrations',

      'tags',
      'tag_datatypes',
      'tag_entities',
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