<template>
  <v-col :cols="cols">
    <v-sheet elevation="3" class="d-flex flex-fill flex-stretch" @click="focusing=title">
      <!-- editor list region (left) -->
      <v-list lines="one" :opened="[title]" :key="`param-list.${last_updated}`">
        <!-- add new -->
        <v-list-subheader>{{ title }}</v-list-subheader>
        <v-list-item title="Add" subtitle="String" append-icon="mdi-plus" @click="add_new" />
        <v-divider />
        <v-list-group :value="title" class="editor-list">
          <v-list-item v-for="param, pi in parameters" :key="`param-${param.name}.${param.basistype}_${pi}`"
            :title="param.name" :subtitle="param.basistype" @click="select(param)" />
        </v-list-group>
        <v-spacer />
        <v-divider />
        <v-list-item title="defaults" @click="select(null)" />
      </v-list>
      <!-- editor form (right) -->
      <v-sheet v-if="activated" class="editor-form">
        <v-card v-if="selected != null">
          <v-card-actions>
            <v-card-title>{{ selected.name }}</v-card-title>
            <v-card-subtitle>{{ selected.basistype }}</v-card-subtitle>
            <v-spacer />
            <v-btn icon><v-icon>mdi-trash</v-icon></v-btn>
          </v-card-actions>
          <!-- parameter editor form -->
          <base-form v-model="selected" :fields="fields" :key="`param-editor.${last_updated}`">
            <template #item-items="{item}" >
              <v-select v-if="item.is_array" v-model="item.items" multiple :items="alltypes" item-title="name" item-value="name"
                label="item types" placeholder="any" />
              <v-data-table v-else-if="item.is_object" :items="selected.items" />
              <v-divider v-else />
            </template>
          </base-form>
        </v-card>
        <v-card v-else>
          <base-form class="align-self-stretch" v-model="generate" :fields="generate_fields" />
          <v-card-actions>
            <v-btn @click="generate={}">Cancel</v-btn>
            <v-spacer />
            <v-btn color="primary" @click="add_new">ADD</v-btn>
          </v-card-actions>
        </v-card>
      </v-sheet>
    </v-sheet>
  </v-col>
</template>
<script>
import Parameter from '@/models/parameter';
import { mapWritableState } from 'pinia';
import { useServiceStore } from '@/stores/service';
import { useEditorStore } from '@/stores/editor';
import baseForm from '@/components/forms/baseForm.vue';
// import editorTab from '@/components/editorTabs/editorTab.vue';
// import editorList from '@/components/editorList.vue';
import fields from '@/fields'

const title = 'parameters';

export default {
  name: 'parameterTab',
  components: {
    baseForm,
  },
  methods: {
    select(item) {
      this.selected = item;
      this.last_updated = Date.now();
    },
    add_new() {
      let item = Parameter.create(
        this.generate.name || 'param',
        this.generate.basis || 'string'
      );
      this.parameters.push(item);
      this.select(item);
    },
    remove() {
      this.parameters = this.parameters.filter(dt => dt != this.the_parameter);
      // this.the_parameter = null;
    }
  },
  computed: {
    activated() {
      return this.focusing === title;
    },
    cols() {
      return this.activated ? 8 : 2;
    },
    alltypes() {
      return Parameter.all;
    },
    the_parameter: {
      get() {
        return Parameter.find(this.on_parameter, false);
      },
      set(v) { this.on_parameter = v.name; }
    },
    ...mapWritableState(useEditorStore, ['focusing','on_parameter']),
    ...mapWritableState(useServiceStore, ['parameters']),
  },
  data() {
    return {
      title,
      fields: fields.parameters,
      selected: null,
      generate: {
        name: 'param',
        basistype: 'string',
      },
      generate_fields: fields.parameters
        .filter((pf)=>pf.required)
        .map((pf)=>Object.assign({}, pf, {cols: 12})),
      last_updated: Date.now(),
      // primitives: Parameter.primitives,
    };
  },
}
</script>

<style scoped>
.editor-list {
  width: 100%;
  min-width: 13.5vw;
  height: 70vh;
  overflow-y: auto;
}
.editor-form {
  max-width: 50vw;
}
</style>