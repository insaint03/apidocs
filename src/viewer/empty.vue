<template>
  <v-container class="fill-height">
    <v-spacer />
    <v-card>
      <v-card-item>
        <v-card-title>Need to load the document</v-card-title>
        <v-card-subtitle>Empty project</v-card-subtitle>
      </v-card-item>
      <v-card-text>
        <p>Load the document</p>
        <v-form>
          <v-text-field v-model="file" label="File Location" variant="underlined" />
          <v-btn @click="loads(file)" color="primary">Load</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
    <v-spacer />
  </v-container>
</template>

<script>
import { mapActions } from 'pinia';
import { useProjectStore } from '@/stores/project';

export default {
  name: 'emptyViewer',
  methods: {
    ...mapActions(useProjectStore, ['loads']),
  },
  data() {
    return {
      file: '../../data/simple.native.yaml',
    };
  },
};
</script>