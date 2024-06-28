<template>
  <v-row>
    <!-- show guide to open -->
    <v-col>
      <v-card>
        <v-card-title>Open document</v-card-title>
        <v-card-text>
          Click File > Open to load a project file.
        </v-card-text>
      </v-card>
    </v-col>
    <v-col>
      <v-card>
        <v-card-title>QuickLoad</v-card-title>
        <v-card-text>
          <v-list>
            <template v-if="recents && 0 < recents.length">
              <v-list-subheader>Recents</v-list-subheader>
              <v-list-item v-for="rec in recents" :key="`recents.${rec.location}`" :title="rec.title"
                :subtitle="moment(rec.timestamp)" :text="rec.location" @click="loads(rec.location)">
              </v-list-item>
              <v-divider />
            </template>
            <v-list-subheader>Examples</v-list-subheader>
            <v-list-item v-for="ex,ei in list" :key="`examples.${ex.location}`" :title="ex.title"
              :active="ei==0" :color="$thx.color.primary"
              :subtitle="ex.location" :text="ex.description" :disabled="ex.disabled"
              @click="loads(ex.location)" />
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { mapActions, mapState } from 'pinia';
import { useProjectStore } from '@/stores/project';
import { useExampleStore } from '@/stores/example';

export default {
  name: 'emptyView',
  methods: {
    moment(timestamp) {
      return (new Date(timestamp)).toLocaleString();
    },
    ...mapActions(useProjectStore, [
      'loads'
    ]),
  },
  computed: {
    ...mapState(useProjectStore, [
      'recents',
    ]),
    ...mapState(useExampleStore, [
      'list',
    ]),
  },
  // degug
  mounted() {
    this.loads(this.list[0].location);
  },
}
</script>