<template>
  <!-- app bar -->
  <app-bar />
  <v-navigation-drawer app location="right" permanent>
    <tocView v-model:open="open" :scrollspy="scrollspy" />
  </v-navigation-drawer>
  <v-main app>
    <v-container fluid elevation="1"  id="main">
      <!-- project info -->
      <v-row v-if="project_ready">
        <v-col>
          <info-view tab="summary" id="/about/" v-model:open="open._about" />
        </v-col>
      </v-row>
      <!-- TODO: migrations //--
      <v-row>
        <v-col>
          <collapsible-card title="_migration" icon="mdi-database-export" :default-open="false" actions>
            <migrations-view />
          </collapsible-card>
        </v-col>
      </v-row>
      -->

      <!-- by template -->
      <v-row>
        <v-col>
          <collapsible-card v-for="tmpl in tags" :key="`tag-${tmpl.tagname}`"
            v-model:open="open._tag[tmpl.tagname]"
            :id="`/tag/${tmpl.tagname}`"
            :card-props="{color: $thx.color.tag}" :title="tmpl.tagname" :icon="$thx.icon.tag">
            <template #toolbar-sub><i>:{{ tmpl.summary }}</i></template>
            <tag-view :id="tmpl.el" v-bind="tmpl" />
          </collapsible-card>
        </v-col>
      </v-row>
      <!-- by datatypes -->
      <v-row>
        <v-col>
          <collapsible-card v-if="project_ready"
            id="/datatype/" v-model:open="open._datatype"
            :card-props="{color: $thx.color.datatype}" title="_datatypes" :icon="$thx.icon.datatype">
            <v-row v-for="tp in datatype_list" :key="tp.el">
              <v-col>
                <datatype-view :id="`/datatype/${tp.name}`" :datatype="tp" />
              </v-col>
            </v-row>
          </collapsible-card>
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
import collapsibleCard from '@/components/collapsibleCard.vue';
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
    collapsibleCard,
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
    scrolls(e) {
      console.log('scroll', e, arguments);
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
      open:{
        _about: false,
        _tag: {},
        _datatype: false,
        _endpoint: {},
      },
      // opentabs: [],
      scrollspy: {},

    }
  }
}
</script>