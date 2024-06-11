<template>
  <!-- app bar -->
  <app-bar />
  <v-navigation-drawer app location="right" permanent>
    <tocView :open="opentabs" :scrollspy="scrollspy" />
  </v-navigation-drawer>
  <v-main app v-scroll="scrolls">
    <v-expansion-panels elevation="1" ripple multiple>

      <!-- about project -->
      <v-expansion-panel title="_about" value="_about" elevation="1">
        <v-expansion-panel-text>
          <info-view tab="summary" id="about" />
        </v-expansion-panel-text>
      </v-expansion-panel>

      <!-- TODO: migration scheme --> 
      <v-expansion-panel title="_migration" value="_migration" elevation="1">
        <v-expansion-panel-text>
          <migrations-view />
        </v-expansion-panel-text>
      </v-expansion-panel>

      <!-- by template tagnames -->
      <v-expansion-panel v-for="tmpl in tags" :key="`tag-${tmpl.tagname}`" elevation="1"
        :title="`#${tmpl.tagname}`" :value="tmpl.el">
        <v-expansion-panel-text>
          <tag-view :id="tmpl.el" v-bind="tmpl" />
        </v-expansion-panel-text>  
      </v-expansion-panel>

      <!-- datatypes -->
      <v-expansion-panel title="_datatypes" value="_datatypes" elevation="1">
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
    <v-container fluid elevation="1">
      <!-- full api references -->
      <template v-if="project_ready">
        <endpoint-view v-for="ep, ei in entities" :key="`endpoint-${ei}`"
          :id="ep.el"
          :endpoint="ep" />
      </template>
      <!-- on clear -->
      <template v-else>
        <v-row>
          <!-- show guide to open -->
          <v-col>
            <v-card>
              <v-card-title>Open document</v-card-title>
              <v-card-text>
                Click File > Open to load a project file.
              </v-card-text>
            </v-card>
          </v-col>
          <v-col>
            <v-card>
              <v-card-title>QuickLoad</v-card-title>
              <v-card-text>
                <v-list>
                  <template v-if="recents && 0<recents.length">
                    <v-list-subheader>Recents</v-list-subheader>
                    <v-list-item v-for="rec in recents" :key="`recents.${rec.location}`"
                      :title="rec.title" :subtitle="moment(rec.timestamp)"  :text="rec.location"
                      @click="loads(rec.location)">
                    </v-list-item>
                    <v-divider />
                  </template>
                  <v-list-subheader>Examples</v-list-subheader>
                  <v-list-item v-for="ex in list" :key="`examples.${ex.location}`"
                    :title="ex.title" :subtitle="ex.location" :text="ex.description"
                    :disabled="ex.disabled"
                    @click="loads(ex.location)" />
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </template>
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
import { useExampleStore } from '@/stores/example';

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
  },
  methods: {
    scrolls() {

    },
    moment(timestamp) {
      return (new Date(timestamp)).toLocaleString();
    },
    ...mapActions(useProjectStore, [
      'caches',
      'revoke',
      'loads',
      'saves',
      'recovers',
    ]),
  },
  computed: {
    ...mapState(useProjectStore, [
      'project',
      'project_ready',
      'datatype_list',
      'entities',
      'tags',
      'templates',
      'tag_datatypes',
      'tag_entries',
      'migrations',
      'timestamp',
      'recents',
    ]),
    ...mapState(useExampleStore, [
      'list'
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