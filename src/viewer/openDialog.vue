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
import { mapActions, mapState } from 'pinia';
import { useProjectStore } from '@/stores/project';
import { useExampleStore } from '@/stores/example';
// const recent_key = '_recents';
// const sample = '../../data/simple.native.yaml';

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
    ...mapActions(useProjectStore, ['loads']),
  },
  props: {
    modelValue: Boolean,
  },
  computed: {
    items() {
      return [{location: this.search}]
        .concat(this.recents)
        .concat(this.examples)
        .filter((v)=>!v.disabled)
        .map((v)=>v.location)
        .filter((v)=>v && 0<v.trim().length)
        .filter((v, i, a) => a.indexOf(v) === i);
    },
    ...mapState(useExampleStore, {'examples': 'list'}),
    ...mapState(useProjectStore, ['recents']),
  },
  data() {
    // const recents = this.load_recents();
    return {
      value: this.modelValue,
      loading: false,
      // recents,
      file: null,
      search: null,
    };
  },
};
</script>