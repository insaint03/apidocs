<template>
  <v-card elevation="0" color="secondary">
    <v-card-title>migrations</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="2">
          <v-tabs v-model="selected" :items="names" />
        </v-col>
        <v-col cols="10">
          <v-window v-model="selected">
            <v-window-item v-for="mig in migrations" :key="mig.name" :value="mig.name">
              <v-row>
                <v-col>
                  <!-- description -->
                  <v-text-field :model-value="mig.migration" />
                  <v-text-field :model-value="mig.summary" />
                  <v-textarea :model-velua="mig.desc" />
                </v-col>
                <v-col>
                  <view-items :modelValue="mig.items" />
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapState } from 'pinia';
import { useProjectStore } from '@/stores/project';
import viewItems from './items.vue';

export default {
  name: 'migrationsView',
  components: {
    viewItems,
  },
  props: {
    // migrations: Array,
  },
  computed: {
    names() {
      return this.migrations.map((v) => v.name);
    },
    ...mapState(useProjectStore, ['migrations']),
  },
  data() {
    return {
      selected: null,
    };
  }
}
</script>