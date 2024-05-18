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
    <v-list-group value="datatypes">
    </v-list-group>
  </v-navigation-drawer>
  <v-main>

  </v-main>
</template>
<script>
import { mapWritableState, mapActions } from 'pinia';
import { useProjectStore } from '@/stores/project';

export default {
  name: 'viewerView',
  methods: {
    ...mapActions(useProjectStore, [
      'load', 'save', 'cache',
    ]),
  },
  computed: {
    ...mapWritableState(useProjectStore, [
      'project',
      'datatypes',
      'templates',
      'entities',
      'timestamp',
    ]),
  },
  data() {
    return {
    };
  },
}
</script>