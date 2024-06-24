<template>
  <v-card>
    <v-card-item>
      <v-card-title class="d-flex flex-fill align-center justify-between">
        {{ value.name }}
        <v-chip>v{{ value.version }}</v-chip>
      </v-card-title>
      <v-card-subtitle>{{ value.summary }}</v-card-subtitle>
    </v-card-item>
    <!-- form -->
    <v-card-text>
      <v-row>
        <!-- -->
        <v-col cols="6">
          <!-- project title -->
          <v-text-field v-model="value.name" label="name" v-bind="$thx.field" />
          <!-- project version -->
          <v-text-field v-model="value.version" label="version" v-bind="$thx.field" />
          <!-- project license -->
          <v-text-field v-model="value.license" label="license" v-bind="$thx.field" />
          <!-- project terms -->
          <v-text-field v-model="value.terms" label="terms" v-bind="$thx.field" />
          <!-- project links -->
          <v-text-field v-model="value.links" label="links" v-bind="$thx.field" />
          <!-- project contributors -->
          <v-text-field v-model="value.contributors" label="contributors" v-bind="$thx.field" />
          <!-- project keywords -->
          <v-text-field v-model="value.keywords" label="keywords" v-bind="$thx.field" />
        </v-col>
        <v-col cols="6">
          <v-textarea :model-value="value.description"
            @change="describe"
            label="description" v-bind="$thx.field" />
          <v-divider>
            <v-label>description preview</v-label>
          </v-divider>
          <v-card :color="$thx.color.markdown">
            <v-card-title>{{ value.summary }}</v-card-title>
            <v-card-text>
              <mark-down v-model="value.desc" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import Project from '@/models/project';

export default {
  name: 'projectEditor',
  methods: {
    describe(ev) {
      this.$emit('update:modelValue', this.value);
      this.value.description = ev.target.value || '';
    }
  },
  components: {
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