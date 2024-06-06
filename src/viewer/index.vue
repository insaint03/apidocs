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
          <info-view tab="summary" id="about" />
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
        <v-row v-for="tmpl in tags" :key="`tag-${tmpl.tagname}`">
          <v-col>
            <v-card flat :id="tmpl.el">
              <v-card-title :id="`tag-${tmpl.tagname}`">{{ tmpl.tagname }}</v-card-title>
              <v-card-text>
                {{  tmpl.description }}
                <v-row>
                  <!-- tmpl - datatypes -->
                  <v-col>
                    <v-list>
                      <v-list-group>
                        <v-list-item v-for="tp in tmpl.datatypes" :key="`tag-${tmpl.tagname}-${tp}`"
                          :title="tp" />
                      </v-list-group>
                    </v-list>
                  </v-col>
                  <!-- tmpl - entities -->
                  <v-col>
                    <v-list>
                      <v-list-group>
                        <v-list-item v-for="(ep, ei) in tmpl.entities" :key="`tag-${tmpl.tagname}-${ei}`"
                          :title="ep" />
                      </v-list-group>
                    </v-list>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <!-- datatype view -->
        <datatype-view v-for="tp in datatype_list" :key="`type-${tp.name}`"
          :id="tp.el"
          :datatype="tp" />
        <v-row>&nbsp;</v-row>

        <!-- full api references -->
        <endpoint-view v-for="ep, ei in entities" :key="`endpoint-${ei}`"
          :id="ep.el"
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