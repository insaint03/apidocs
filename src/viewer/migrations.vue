<template>
  <v-card elevation="0" color="secondary">
    <v-card-title>migrations</v-card-title>
    <v-card-text>
      <v-tabs v-model="selected" :items="migrations">

      </v-tabs>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapState  } from 'pinia';
import { useProjectStore } from '@/stores/project';

export default {
  name: 'migrationsView',
  props: {
    // migrations: Array,
  },
  computed: {
    ...mapState(useProjectStore, ['migrations']),
  },
  data() {
    return {
      selected: null,
    };
  }
}
</script>