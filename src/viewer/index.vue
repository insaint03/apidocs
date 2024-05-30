<template>
  <!-- app bar -->
  <app-bar />
  <v-navigation-drawer app location="right" permanent>
    <tocView :open="opentabs" :scrollspy="scrollspy" />
  </v-navigation-drawer>
  <v-main app v-scroll="scrolls">
    <v-expansion-panels elevation="0" ripple multiple>
      <!-- about project -->
      <v-expansion-panel title="about project" elevation="0">
        <v-expansion-panel-text>
          <info-view tab="summary" />
        </v-expansion-panel-text>
      </v-expansion-panel>
      <!-- migration scheme -->
      <v-expansion-panel title="migration" elevation="0">
        <v-expansion-panel-text>
          <migrations-view />
        </v-expansion-panel-text>
      </v-expansion-panel>
      <!-- by template tagnames -->
      <v-container fluid>
        <v-row v-for="tag in tagnames" :key="`tag-${tag.tagname}`">
          <v-col>
            <v-card flat>
              <v-card-title :id="`tag-${tag.tagname}`">{{ tag.tagname }}</v-card-title>
            </v-card>
          </v-col>
        </v-row>
        <!-- datatype view -->
        <datatype-view v-for="tp in datatype_list" :key="`type-${tp.name}`"
          :datatype="tp" />
        <v-row>&nbsp;</v-row>

        <!-- full api references -->
        <endpoint-view v-for="ep, ei in entities" :key="`endpoint-${ei}`"
          :endpoint="ep" />
        <v-row>&nbsp;</v-row>
      </v-container>
    </v-expansion-panels>
  </v-main>
</template>
<script>
// import models from '@/models'
// on empty

// navigation tab
import appBar from './appbar.vue';
import migrationsView from './migrations.vue';
import tocView from './toc.vue';
import infoView from './info.vue';
import datatypeView from './datatype.vue';
import endpointView from './endpoint.vue';
// import tagView from './tags.vue';


import { mapWritableState } from 'pinia';
import { useProjectStore } from '@/stores/project';

export default {
  name: 'viewerPage',
  components: {
    appBar,
    migrationsView,
    datatypeView,
    endpointView,
    // emptyView,
    tocView,
    infoView,
    // tagView,
  },
  async onCreated() {
    await this.load('../../data/simple.native.yaml');
  },
  methods: {
    scrolls() {

    },
  },
  computed: {
    ...mapWritableState(useProjectStore, [
      // 'project_ready',
      'project',
      'tagnames',
      'migrations',
      'datatypes',
      'datatype_list',
      'entities',
    ]),
  },
  data() {
    return {
      opentabs: [],
      scrollspy: {},
    }
  }
}
</script>