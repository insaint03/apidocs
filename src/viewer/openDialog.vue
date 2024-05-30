<template>
  <v-dialog :modelValue="modelValue" @update:modelValue="(v)=>$emit('update:modelValue', v)">
    <v-card :loading="loading">
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
  </v-dialog>
</template>

<script>
import { mapActions } from 'pinia';
import { useProjectStore } from '@/stores/project';
const recent_key = '_recents';

export default {
  name: 'openDialog',
  methods: {
    async load_current() {
      this.loading = true;
      const the_file = this.file || this.search;
      const ret = await this.loads(the_file);
      this.$emit('load', ret);
      this.loading = false;
      this.$emit('update:modelValue', false);
      
    },
    load_recents() {
      return JSON.parse(localStorage.getItem(recent_key) || '[]');
    },
    save_recents() {
      localStorage.setItem(recent_key, JSON.stringify(this.recents));
    },
    ...mapActions(useProjectStore, ['loads']),
  },
  props: {
    modelValue: Boolean,
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
    return {
      value: this.modelValue,
      loading: false,
      recents,
      file: null,
      search: '../../data/simple.native.yaml',
    };
  },
};
</script>