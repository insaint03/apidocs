<template>
  <v-card>
    <v-toolbar>
      <v-toolbar-title>
        <v-icon :color="$thx.color.info">mdi-information</v-icon>
        Project info
        <v-divider vertical />
        {{ project.name }}
      </v-toolbar-title>
      <v-spacer />
      <v-chip size="small">v{{ project.version }}</v-chip>
    </v-toolbar>
    <v-card-subtitle>{{ project.summary }}</v-card-subtitle>
    <!-- form -->
    <v-card-text>
      <v-row>
        <!-- -->
        <v-col xl="4" md="6" sm="12">
          <!-- project title -->
          <v-text-field v-model="project.name" label="name" v-bind="$thx.field" />
          <!-- project version -->
          <v-text-field v-model="project.version" label="version" v-bind="$thx.field" />
          <!-- project links -->
          <multi-liner-fields v-model="project.links" label="links" :icons="$thx.icon.links" />
          
          
        </v-col>
        
        <v-col xl="4" md="6" sm="12">
          <markdown-field 
            v-model="project.description" 
            label="description"
            @change="describe"
            v-bind="$thx.field" />
        </v-col>
        <v-col xl="4" md="6" sm="12">
          <!-- project license -->
          <single-liner-field v-model="project.license" label="license" />
          <!-- project contributors -->
          <multi-liner-fields v-model="project.contributors" label="contributors" />
          <!-- project terms -->
          <multi-liner-fields v-model="project.terms" label="terms" />
          <!-- project keywords 
          <keyword-field v-model="project.keywords" label="keywords" />
          -->
        </v-col>
        <v-col xl="4" md="6" sm="12">
          <!-- TODO: document history -->
          <history-field :project="project" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
// import Project from '@/models/project';

import { mapWritableState } from 'pinia';
import { useProjectStore } from '@/stores/project';

import singleLinerField from '@/editor/components/singleLinerField.vue';
import multiLinerFields from '@/editor/components/multiLinerFields.vue';
// import keywordField from '@/editor/components/keywordField.vue';
import historyField from '@/editor/components/historyField.vue';
import markdownField from '@/components/markdownField.vue';

export default {
  name: 'projectEditor',
  components: {
    singleLinerField,
    multiLinerFields,
    // keywordField,
    historyField,
    markdownField,
  },
  methods: {
    describe(ev) {
      this.$emit('update:modelValue', this.value);
      this.value.description = ev.target.value || '';
    }
  },
  props: {
    // project: Project,
  },
  computed: {
    ...mapWritableState(useProjectStore, ['project']),
  },
  data() {
    return {
      value: this.project,
    };
  }
}
</script>