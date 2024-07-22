<template>
  <v-card flat>
    <v-card-item>
      <v-card-title>
        start apidocs
      </v-card-title>
      <v-card-subtitle>
        v0.4.a.draft
      </v-card-subtitle>
    </v-card-item>
    <v-card-text>
      <v-row>
        <v-col>
          <v-list elevation="1" color="primary">
            <v-list-item title="start new" subtitle="start new project" prepend-icon="mdi-new-box" @click="clears" />
            <v-list-item active title="open apidocs" subtitle="see apidocs example document" @click="load_guide" prepend-icon="mdi-information-box" />
            <v-list-item title="import" subtitle="import from external link" prepend-icon="mdi-import" @click="import_dialog=true" />
          </v-list>
        </v-col>
        <v-col>
          <v-list elevation="1" color="secondary">
            <template v-if="recents && 0 < recents.length">
              <v-list-subheader>Recents</v-list-subheader>
              <v-list-item v-for="rec in recents" :key="`recents.${rec.location}`" :title="rec.title"
                :subtitle="moment(rec.timestamp)" :text="rec.location" @click="loads(rec.location)">
              </v-list-item>
              <v-divider />
            </template>
            <v-list-subheader>Examples</v-list-subheader>
            <v-list-item v-for="ex,ei in list" :key="`examples.${ex.location}`" :title="ex.title"
              :active="ei==0"
              :subtitle="ex.location" :text="ex.description" :disabled="ex.disabled"
              @click="loads(ex.location)" />
          </v-list>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
    <open-dialog v-model="import_dialog" />
</template>
<script>
const guide_location = import.meta.env.VITE_GUIDE_LOCATION;
import { mapActions, mapState } from 'pinia';
import { useProjectStore } from '@/stores/project';
import { useExampleStore } from '@/stores/example';
import openDialog from './openDialog.vue';

export default {
  name: 'emptyView',
  components: {
    openDialog,
  },
  methods: {
    load_guide() {
      this.loads(guide_location)
        .then(()=>this.$router.push('/view'));
    },
    moment(timestamp) {
      return (new Date(timestamp)).toLocaleString();
    },
    ...mapActions(useProjectStore, [
      'loads',
      'clears',
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
  data() {
    return {
      // guide_location,
      import_dialog: false,
    }
  }
}
</script>