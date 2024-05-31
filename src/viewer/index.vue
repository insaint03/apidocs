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
      <!-- TODO: migration scheme 
      <v-expansion-panel title="migration" elevation="0">
        <v-expansion-panel-text>
          <migrations-view />
        </v-expansion-panel-text>
      </v-expansion-panel>
      -->
      <!-- by template tagnames -->
      <v-container fluid>
        <v-row v-for="tag in tags" :key="`tag-${tag}`">
          <v-col>
            <v-card flat>
              <v-card-title :id="`tag-${tag}`">{{ tag }}</v-card-title>
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


import { mapActions, mapState } from 'pinia';
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
  onMounted() {
    console.log('try to revoke');
    this.revoke();
  },
  methods: {
    scrolls() {

    },
    ...mapActions(useProjectStore, [
      'caches',
      'revoke',
      'saves',
      'recovers',
    ]),
  },
  computed: {
    ...mapState(useProjectStore, {
      'project': 'project',
      'datatype_list': 'datatypes',
      'entities': 'entities',
      'tags': 'tags',
      'tag_datatypes': 'tag_datatypes',
      'tag_entries': 'tag_entries',
      'migrations': 'migrations',
      'timestamp': 'timestamp',
    }),
  },
  data() {
    return {
      opentabs: [],
      scrollspy: {},
    }
  }
}
</script>