<template>
  <v-row v-for="mm in migrations" :key="`m-${mm.name}.${mm.migration}`">
    <v-col>
      <v-card flat :color="$thx.color.migration">
        <v-card-title>{{ mm.migration }}</v-card-title>
        <v-card-subtitle>{{ mm.name }}</v-card-subtitle>
        <v-card-text>
          <v-row>
            <v-col>
              <!-- description -->
              <v-text-field :model-value="mm.migration" v-bind="$thx.field" />
              <v-text-field :model-value="mm.summary" v-bind="$thx.field" />
              <v-textarea :model-velua="mm.desc" v-bind="$thx.field" />
            </v-col>
            <v-col>
              <view-items :modelValue="mm.name" />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
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