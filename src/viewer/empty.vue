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
          <v-autocomplete v-model="file" v-model:search="search" :items="items" label="File Location" variant="underlined"
            autofocus clearable auto-select-first
            @key.enter.stop="load_current" />
          <v-btn @click="load_current" color="primary">Load</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
    <v-spacer />
  </v-container>
</template>

<script>
import { mapActions } from 'pinia';
import { useProjectStore } from '@/stores/project';
const recent_key = '_recents';

export default {
  name: 'emptyViewer',
  methods: {
    load_current() {
      const the_file = this.search || this.file;
      this.recents = [the_file]
        .concat(this.recents.filter((r) => r !== the_file))
        .filter((v) => v && 0 < v.trim().length);
      this.save_recents();
      this.loads(the_file);
    },
    load_recents() {
      return JSON.parse(localStorage.getItem(recent_key) || '[]');
    },
    save_recents() {
      localStorage.setItem(recent_key, JSON.stringify(this.recents));
    },
    ...mapActions(useProjectStore, ['loads']),
  },
  computed: {
    items() {
      return [this.search]
        .concat(this.recents)
        .filter((v)=>v && 0<v.trim().length)
        .filter((v, i, a) => a.indexOf(v) === i);
    },
  },
  data() {
    const recents = this.load_recents();
    console.log('rec', recents);
    return {
      recents,
      file: null,
      search: '../../data/simple.native.yaml',
    };
  },
};
</script>