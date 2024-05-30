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

// const tabs = ['summary', 'legal', 'history'];
const fields = [
  [
    { key: 'name', label: 'project name' },
    { key: 'version', label: 'version' },
    { key: 'summary', label: 'summary' },
    { key: 'links', label: 'links', is: 'v-textarea' },
    { key: 'license', label: 'license' },
  ],
  [
    { key: 'desc', label: 'description', is: 'v-textarea' },

  ], 
  [

    { key: 'contributors', label: 'contributors', is: 'v-textarea' },
    { key: 'terms', label: 'terms of use', is: 'v-textarea' },
    { key: 'privacy', label: 'privacy policy', is: 'v-textarea' },
    { key: 'history', label: 'history', is: 'v-textarea' },
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
