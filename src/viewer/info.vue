<template>
  <v-card elevation="0" color="default">
    <v-toolbar flat rounded>
      <v-tabs v-model="active_tab">
        <v-tab v-for="tab in tabs" :key="tab" :value="tab">{{ tab }}</v-tab>
      </v-tabs>
    </v-toolbar>
    <v-window v-model="active_tab">
      <!-- project info:summary -->
      <v-window-item :value="tabs[0]">
        <v-row>
          <v-col>
            <view-forms v-model="project" :fields="fields.summary" />
          </v-col>
          <v-col>
            <view-forms v-model="project" :fields="fields.summary_desc" />
          </v-col>
        </v-row>
      </v-window-item>
      <!-- project legal information -->
      <v-window-item :value="tabs[1]">
        <v-row>
          <v-col>
            <view-forms v-model="project" :fields="fields.legal" />
          </v-col>
          <v-col>
            <view-forms v-model="project" :fields="fields.legal_desc" />
          </v-col>
        </v-row>
      </v-window-item>
      <!-- TODO: document version history -->
      <v-window-item :value="tabs[2]">
        <v-row>
          <v-col cols="3">
          </v-col>
          <v-col cols="9">
          </v-col>
        </v-row>
      </v-window-item>
    </v-window>
  </v-card>
</template>
<script>
import { mapState } from 'pinia';
import { useProjectStore } from '@/stores/project';
import viewForms from './forms.vue';

const tabs = ['summary', 'legal', 'history'];
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
      tabs,
      fields: {
        summary: [
          { key: 'name', label: 'project name' },
          { key: 'version', label: 'version' },
          { key: 'links', label: 'links', is: 'v-textarea' }
        ],
        summary_desc: [
          { key: 'summary', label: 'summary' },
          { key: 'desc', label: 'description', is: 'v-textarea' },
        ],
        legal: [
          { key: 'license', label: 'license' },
          { key: 'contributors', label: 'contributors', is: 'v-textarea' },
        ],
        legal_desc: [
          { key: 'terms', label: 'terms of use', is: 'v-textarea' },
          { key: 'privacy', label: 'privacy policy', is: 'v-textarea' },
        ]
      },
      active_tab: this.tab,
    }
  }
}
</script>
