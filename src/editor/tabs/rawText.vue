<template>
  <v-card>
    <!-- top tools -->
    <v-toolbar flat style="background-color: inherit;">
      <!-- json/yaml toggle -->
      <v-toolbar-items>
        <v-btn text @click="toggle_mode" :color="mode == 'yaml' ? 'primary' : ''">
          {{ mode }}
        </v-btn>
      </v-toolbar-items>
      <v-spacer />
      <v-toolbar-items>
        <!-- update if dirty -->
        <v-btn text @click="load_update" :disabled="!dirty">
          <v-icon>mdi-sync</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-sheet theme="dark" class="fill-height">
      <v-textarea v-intersect="intersect" class="pa-4" auto-grow v-model="texts" v-bind="$thx.field" />
    </v-sheet>
    <v-card-actions>
      <v-spacer />
      <v-btn text @click="load_update" :disabled="!dirty">
        sync
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapState, mapActions } from 'pinia';
import { useProjectStore } from '@/stores/project';

export default {
  name: 'rawTextTab',
  methods: {
    async init_current() {
      const txt = await this[`serialize_${this.mode}`]();
      this.value = ''+txt;
      this.texts = ''+txt;
    },
    async load_update() {
      const serializer = this[`parse_${this.mode}`];
      this.load_state(await serializer(this.texts));
    },
    async intersect(visible) {
      if(visible) {
        this.init_current();
      } else {
        this.load_update();
      }
    },
    async toggle_mode() {
      this.mode = this.mode == 'yaml' ? 'json' : 'yaml';
      this.init_current();
    },
    ...mapActions(useProjectStore, [
      'load_state',
      'parse_json',
      'parse_yaml',
      'serialize_json',
      'serialize_yaml',
    ]),
  },
  props: {
    modelValue: String,
  },
  computed: {
    parsed() {
      const serializer = this[`parse_${this.mode}`];
      return serializer(this.texts);
    },
    current() {
      return {
        location: this.location,
        project: this.project,
        datatypes: this.datatypes,
        templates: this.templates,
        entities: this.entities,
      }
    },
    ...mapState(useProjectStore, [
      'location',
      'project',
      'datatypes',
      'templates',
      'entities',
    ]),
    dirty() {
      return this.texts != this.value;
    }
    // texts: {
    //   get() {
    //     return this.modelValue;
    //   },
    //   set(value) {
    //     this.$emit('update:modelValue', value);
    //   },
    // },
  },
  data() {
    return {
      mode: 'yaml',
      texts: '',
      value: '',
      // intersect: null,
    }
  }
}
</script>