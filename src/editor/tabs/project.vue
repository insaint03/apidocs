<template>
  <v-card>
    <tab-header icon="mdi-information" :color="$thx.color.info">
      <template #title>
        {{ project.name || 'project info' }}
        &nbsp;
        <v-chip size="small">v{{ project.version }}</v-chip>
      </template>
    </tab-header>
    <v-card-subtitle>{{ project.summary }}</v-card-subtitle>
    <!-- form -->
    <v-card-text>
      <v-row>
        <!-- -->
        <v-col md="6" sm="12">
          <!-- project title -->
          <v-text-field v-model="project.name" label="name" v-bind="$thx.field" />
          <!-- project version -->
          <v-text-field v-model="project.version" label="version" v-bind="$thx.field" />
          <!-- project links -->
          <multi-liner-fields v-model="project.links_text" :items="project.link_items" label="links" :icons="$thx.icon.links" />
        </v-col>
        
        <v-col md="6" sm="12">
          <markdown-field 
            v-model="project.description" 
            label="description"
            @change="describe"
            v-bind="$thx.field" />
        </v-col>
        <v-col md="6" sm="12">
          <!-- project license -->
          <single-liner-field v-model="project.license_text" :item="project.license_item" label="license" />
          <!-- project contributors -->
          <multi-liner-fields v-model="project.contributors_text" :items="project.contributor_items" label="contributors" />
          <!-- project terms -->
          <multi-liner-fields v-model="project.terms_text" :items="project.term_items" label="terms" />
          <!-- project keywords 
          <keyword-field v-model="project.keywords" label="keywords" />
          -->
        </v-col>
        <v-col md="6" sm="12">
          <!-- TODO: document history -->
          <history-field v-model="project.history" v-model:version="project.version" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>

import { mapWritableState } from 'pinia';
import { useProjectStore } from '@/stores/project';

import tabHeader from '@/editor/components/tabHeader.vue';
import singleLinerField from '@/editor/components/singleLinerField.vue';
import multiLinerFields from '@/editor/components/multiLinerFields.vue';
import historyField from '@/editor/components/historyField.vue';
import markdownField from '@/components/markdownField.vue';


export default {
  name: 'projectEditor',
  components: {
    tabHeader,
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