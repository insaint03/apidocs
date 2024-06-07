<template>
  <!-- app bar -->
  <app-bar />
  <v-navigation-drawer app location="right" permanent>
    <tocView :open="opentabs" :scrollspy="scrollspy" />
  </v-navigation-drawer>
  <v-main app v-scroll="scrolls">
    <v-expansion-panels elevation="0" ripple multiple>

      <!-- about project -->
      <v-expansion-panel title="_about" value="_about" elevation="0">
        <v-expansion-panel-text>
          <info-view tab="summary" id="about" />
        </v-expansion-panel-text>
      </v-expansion-panel>

      <!-- TODO: migration scheme --> 
      <v-expansion-panel title="_migration" value="_migration" elevation="0">
        <v-expansion-panel-text>
          <migrations-view />
        </v-expansion-panel-text>
      </v-expansion-panel>

      <!-- by template tagnames -->
      <v-expansion-panel v-for="tmpl in tags" :key="`tag-${tmpl.tagname}`"
        :title="`#${tmpl.tagname}`" :value="tmpl.el">
        <v-expansion-panel-text>
          <tag-view :id="tmpl.el" v-bind="tmpl" />
        </v-expansion-panel-text>  
      </v-expansion-panel>

      <!-- datatypes -->
      <v-expansion-panel title="_datatypes" value="_datatypes">
        <v-expansion-panel-text>
          <v-row>
            <v-col>datatypes</v-col>
          </v-row>
          <v-row v-for="tp in datatype_list" :key="tp.el">
            <v-col>
              <datatype-view :id="tp.el" :datatype="tp" />
            </v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-container fluid>
      <!-- full api references -->
      <endpoint-view v-for="ep, ei in entities" :key="`endpoint-${ei}`"
        :id="ep.el"
        :endpoint="ep" />
      <v-row>&nbsp;</v-row>
    </v-container>
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
import tagView from './tags.vue';
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
    tagView,
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
    ...mapState(useProjectStore, [
      'project',
      'datatype_list',
      'entities',
      'tags',
      'templates',
      'tag_datatypes',
      'tag_entries',
      'migrations',
      'timestamp',
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