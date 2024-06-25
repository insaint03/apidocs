<template>
  <v-card>
    <v-toolbar :color="$thx.color.info">
      <v-toolbar-title>
        <v-icon>mdi-information</v-icon>
        Project info
        <v-divider vertical />
        {{ value.name }}
      </v-toolbar-title>
      <v-spacer />
      <v-chip size="small">v{{ value.version }}</v-chip>
    </v-toolbar>
    <v-card-subtitle>{{ value.summary }}</v-card-subtitle>
    <!-- form -->
    <v-card-text>
      <v-row>
        <!-- -->
        <v-col xl="4" md="6" sm="12">
          <!-- project title -->
          <v-text-field v-model="value.name" label="name" v-bind="$thx.field" />
          <!-- project version -->
          <v-text-field v-model="value.version" label="version" v-bind="$thx.field" />
          <!-- project links -->
          <multi-liner-fields v-model="value.links" label="links" :icons="$thx.icon.links" />
          
          
        </v-col>
        
        <v-col xl="4" md="6" sm="12">
          <v-textarea :model-value="value.description"
            @change="describe"
            label="description" v-bind="$thx.field" />
          <v-divider>
            <v-label>description preview</v-label>
          </v-divider>
          <v-card>
            <v-card-title>{{ value.summary }}</v-card-title>
            <v-card-text>
              <mark-down v-model="value.desc" />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col xl="4" md="6" sm="12">
          <!-- project license -->
          <single-liner-field v-model="value.license" label="license" />
          <!-- project contributors -->
          <multi-liner-fields v-model="value.contributors" label="contributors" />
          <!-- project terms -->
          <multi-liner-fields v-model="value.terms" label="terms" />
          <!-- project keywords 
          <keyword-field v-model="value.keywords" label="keywords" />
          -->
        </v-col>
        <v-col xl="4" md="6" sm="12">
          <!-- TODO: document history -->
          <history-field :project="value" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import Project from '@/models/project';
import singleLinerField from '@/editor/components/singleLinerField.vue';
import multiLinerFields from '@/editor/components/multiLinerFields.vue';
import keywordField from '@/editor/components/keywordField.vue';
import historyField from '@/editor/components/historyField.vue';

export default {
  name: 'projectEditor',
  components: {
    singleLinerField,
    multiLinerFields,
    keywordField,
    historyField,
  },
  methods: {
    describe(ev) {
      this.$emit('update:modelValue', this.value);
      this.value.description = ev.target.value || '';
    }
  },
  props: {
    modelValue: Project,
  },
  data() {
    return {
      value: this.modelValue,
    };
  }
}
</script>