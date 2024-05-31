<template>
  <v-card elevation="0" color="default">
    <v-toolbar flat rounded density="compact">
      <v-toolbar-title>
        {{ project.name }} <v-chip>{{ project.version }}</v-chip>
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-row>
        <v-col cols="12" xl="4" lg="6" v-for="fs,fi in fields" :key="`info-form.${fi}`">
          <view-forms v-model="project" :fields="fs" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapState } from 'pinia';
import { useProjectStore } from '@/stores/project';
import viewForms from './forms.vue';
import models from '@/models';

const liner_items = {
  itemTitle: 'title',
  itemSubtitle: 'keytype',
  itemLinks: 'links',
  itemDesc: 'description',
}
const link_icons = {
  github: 'mdi-github',
  repository: 'mdi-source-repository',
  wiki: 'mdi-wikipedia',
  issue: 'mdi-ticket-outline',
  issues: 'mdi-ticket-outline',
  docs: 'mdi-file-document',
  document: 'mdi-file-document',
  guideline: 'mdi-file-document',
  license: 'mdi-file-certificate',
  terms: 'mdi-file-document-outline',
  privacy: 'mdi-file-document-outline',
  other: 'mdi-file-document-outline',
}

// const tabs = ['summary', 'legal', 'history'];
const fields = [
  [
    { key: 'name', label: 'project name' },
    { key: 'version', label: 'version' },
    { key: 'summary', label: 'summary' },
    { key: 'links', label: 'links', is: 'view-items', iconMap: link_icons, itemIcon: 'keytype', ...liner_items,  },
    { key: 'license', label: 'license', is: 'view-items', ...liner_items, },
  ],
  [
    { key: 'desc', label: 'description', is: 'v-textarea', },

  ], 
  [

    { key: 'contributors', label: 'contributors', is: 'view-items', ...models.items.liner, },
    // { key: 'terms', label: 'terms of use', items: {}, },
    // { key: 'privacy', label: 'privacy policy', items: {}, },
    { key: 'history', label: 'history', items: {}, },
  ],
]
export default {
  name: 'infoViewer',
  components: {
    viewForms,
  },
  props: {
    tab: String,
  },
  computed: {
    ...mapState(useProjectStore, ['project']),
  },
  data() {
    return {
      // tabs,
      fields,
      active_tab: this.tab,
    }
  }
}
</script>
