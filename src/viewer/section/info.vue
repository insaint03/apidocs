<template>
  <card-section  prefix="about">
    <template #card-title>
      <h1>
        {{ project.name }}
        &nbsp;<sub>v{{ project.version }}</sub>
      </h1>
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
        </v-list>
      </v-col>
    </v-row>
    <!-- version history -->

  </card-section>
</template>
<script>
// import { mapState } from 'pinia';

import Project from '@/models/project';

import cardSection from './card.vue';
import linerListGroup from '@/viewer/components/linerListGroup.vue';
  
export default {
  name: 'infoSection',
  components: {
    cardSection,
    linerListGroup,
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
