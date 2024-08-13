<template>
  <card-section  prefix="about">
    <template #card-title>
      <div class="d-flex flex-fill align-baseline">
        <div class="d-flex flex-fill align-baseline">
          <h1>
            {{ project.name }}
            &nbsp;
          </h1>
          <sub>{{ project.summary }}</sub>
        </div>
        &nbsp;
        <v-chip size="x-small">v{{ project.version }}</v-chip size="small">
      </div>
    </template>
    <!-- card-content -->
    <v-row>
      <v-col>
        <div class="desc-summary">{{ project.summary }}</div>
        <mark-down :model-value=project.desc />
      </v-col>
      <v-col>
        <v-list :color="$thx.color.info" :model-value="Object.keys(liners)">
          <template v-for="([lkey,litems],li) in liners" :key="`liner-${lkey}.${li}`">
            <v-divider v-if="0<li" />
            <liner-list-group :label="lkey" :items="litems" :icons="$thx.icon[lkey]" />
          </template>
          <template v-if="project.history && 0<project.history.length">
            <v-divider />
            <v-list-item append-icon="mdi-chevron-right" @click="show_history=true">
              <template #prepend>
                <v-btn title="history" flat readonly style="background:inherit;color:inherit">
                  <v-icon>mdi-history</v-icon>
                </v-btn>
              </template>
              <v-list-item-title>Version History</v-list-item-title>
              <v-list-item-subtitle>v{{ project.version }} now</v-list-item-subtitle>
            </v-list-item>
          </template>
        </v-list>
      </v-col>
    </v-row>
    <!-- version history -->
    <v-dialog v-model="show_history" max-width="75vw" max-height="70vh">
      <history-card :project="project" @dispose="show_history=false" />
    </v-dialog>

  </card-section>
</template>
<script>
// import { mapState } from 'pinia';

import Project from '@/models/project';

import cardSection from './card.vue';

import linerListGroup from '@/viewer/components/linerListGroup.vue';
import historyCard from '@/viewer/components/historyCard.vue';
  
export default {
  name: 'infoSection',
  components: {
    cardSection,
    linerListGroup,
    historyCard,
  },
  methods: {
    expand_icon(value) {
      return `mdi-chevron-${value?'up':'down'}`;
    },
    liner_items(key) {
      const value = this.project[key];
      return value !=null
        ? (Array.isArray(value) ? value : [value])
        : null;
    }
    
  },
  props: {
    tab: String,
    open: Boolean,
    project: Project,
  },
  computed: {
    liners() {
      return this.liner_keys
        .map(({key,items})=>[key, this.liner_items(items)])
        .filter(([,v])=>v!=null && 0<v.length);
    },

  },
  data() {
    return {
      liner_keys: [
        {key: 'license', items: 'license_item'},
        {key: 'links', items: 'link_items'},
        {key: 'terms', items: 'term_items'},
        {key: 'contributors', items: 'contributor_items'},
      ],
      show_history: false,
      // tabs,
      // fields,
      // link_icons,
      // show_more: false,
      // show_history: false,
      // show_license: false,
      // show_terms: false,
      // show_contributors: false,
      // active_tab: this.tab,
    }
  }
}
</script>
