<template>
  <!-- app bar -->
  <app-bar />
  <v-navigation-drawer app location="right" permanent>
    <tocView :open="opentabs" :scrollspy="scrollspy" />
  </v-navigation-drawer>
  <v-main app v-scroll="scrolls">
    <v-container fluid elevation="1">
      <v-row>
        <v-col>
          <!-- top panel sheet -->
          <v-sheet class="ma-0 pa-0 border-thin" elevation="1">
            <v-expansion-panels flat ripple multiple tile variant="accordion" :disabled="!project_ready">
              <!-- about project -->
              <v-expansion-panel value="_about" >
                <v-expansion-panel-title :color="$thx.color.primary">
                  <v-icon>{{ $thx.icon.about }}</v-icon>
                  _about
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <info-view tab="summary" id="about" />
                </v-expansion-panel-text>
              </v-expansion-panel>
              <!-- 
              <v-expansion-panel value="_migration" class="border-b-thin">
                <v-expansion-panel-title :color="$thx.color.migration">
                  <v-icon>mdi-database-export</v-icon>
                  _migration
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <migrations-view />
                </v-expansion-panel-text>
              </v-expansion-panel>
              -->
              <!-- by template tagnames -->
              <v-expansion-panel v-for="tmpl in tags" :key="`tag-${tmpl.tagname}`"
                class="border-b-thin"
                :value="tmpl.el">
                <v-expansion-panel-title :color="$thx.color.tag">
                  <v-icon>{{ $thx.icon.tag }}</v-icon>
                  {{ tmpl.tagname}}
                  <v-spacer />
                  <i>: {{ tmpl.summary }} &nbsp;</i>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <tag-view :id="tmpl.el" v-bind="tmpl" />
                </v-expansion-panel-text>
              </v-expansion-panel>
              <!-- datatypes -->
              <v-expansion-panel value="_datatypes" class="border-b-thin">
                <v-expansion-panel-title :color="$thx.color.datatype">
                  <v-icon>{{ $thx.icon.datatype }}</v-icon>
                  _datatypes
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-row v-for="tp in datatype_list" :key="tp.el">
                    <v-col>
                      <datatype-view :id="tp.el" :datatype="tp" />
                    </v-col>
                  </v-row>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-sheet>
        </v-col>
      </v-row>
      <!-- full api references -->
      <template v-if="project_ready">
        <v-row v-for="ep, ei in endpathes" :key="`endpoint-${ei}.${ep}`">
          <v-col>
            <endpoint-view :endpath="ep" :endpoints="endpoints[ep]" />
          </v-col>
        </v-row>
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
                  <template v-if="recents && 0 < recents.length">
                    <v-list-subheader>Recents</v-list-subheader>
                    <v-list-item v-for="rec in recents" :key="`recents.${rec.location}`" :title="rec.title"
                      :subtitle="moment(rec.timestamp)" :text="rec.location" @click="loads(rec.location)">
                    </v-list-item>
                    <v-divider />
                  </template>
                  <v-list-subheader>Examples</v-list-subheader>
                  <v-list-item v-for="ex,ei in list" :key="`examples.${ex.location}`" :title="ex.title"
                    :active="ei==0" :color="$thx.color.primary"
                    :subtitle="ex.location" :text="ex.description" :disabled="ex.disabled"
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
// import migrationsView from './migrations.vue';
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
    // migrationsView,
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
      'endpathes',
      'endpoints',
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