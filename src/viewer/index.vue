<template>
  <emptyView v-if="!project_ready" />
  <template v-else>
    <v-navigation-drawer app location="right" permanent>
      <tocView :open="opentabs" :scrollspy="scrollspy" />
    </v-navigation-drawer>
    <v-main>
      <v-expansion-panels>
        <!-- about project -->
        <v-expansion-panel title="about project">
          <v-expansion-panel-text>
            <info-view tab="summary" />
          </v-expansion-panel-text>
        </v-expansion-panel>
        <!-- by template tagnames -->
        <v-expansion-panel v-for="tag in tagnames" :key="`tag-${tag.tagname}`" :title="tag.tagname">
          <v-expansion-panel-text>
            <tag-view v-bind="tag" />
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-divider />
        <!-- datatype view -->
        <v-expansion-panel title="datatypes">
          <v-expansion-panel-text>
            
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel title="endpoints">
          <v-expansion-panel-text>
            
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-main>
  </template>
</template>
<script>
import models from '@/models'
// on empty
import emptyView from './empty.vue';
// navigation tab
import tocView from './toc.vue';
import infoView from './info.vue';
import tagView from './tags.vue';


import { mapWritableState } from 'pinia';
import { useProjectStore } from '@/stores/project';

export default {
  name: 'viewerPage',
  components: {
    emptyView,
    tocView,
    infoView,
    tagView,
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
      'tagnames',
      'datatypes',
      'entities',
    ]),
  },
  data() {
    return {
      opentabs: [],
      scrollspy: {},
      project: {},
      datatypes: {},
      templates: {},
      entities: [],
    }
  }
}
</script>