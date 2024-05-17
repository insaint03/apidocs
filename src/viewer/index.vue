<template>
  <v-app-bar app flat density="compact">
    <!-- TODO: show menu to load & downloads -->
    <v-toolbar-title>{{ project.name || '-' }}</v-toolbar-title>
  </v-app-bar>
  <!-- right panel -->
  <v-navigation-drawer location="right">
    <!-- TODO: ToC -->
    <v-list-subheader>Service</v-list-subheader>
    <v-list-item :title="project.name || ''" :subtitle="project.summary || ''"></v-list-item>
    <v-divider />
    <v-list-item-group value="datatypes">
    </v-list-item-group>
  </v-navigation-drawer>
  <v-main>

  </v-main>
</template>
<script>
import { loads } from '@/models'
export default {
  name: 'viewerPage',
  methods: {
    async load(path) {
      const content = await loads(path);
      this.project = content.project;
      this.datatypes = content.datatypes;
      this.templates = content.templates;
      this.entities = content.entities;
    },
  },
  data() {
    return {
      project: {},
      datatypes: {},
      templates: {},
      entities: [],
    }
  }
}
</script>