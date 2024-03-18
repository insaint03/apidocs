<template>
  <editor-tab title="datatype">
    <template #unfocused>
      <editor-list :items="datatypes" title="datatypes" @select="(d)=>editing.datatype=d">
      </editor-list>
    </template>

    <template #actions>
      <v-card-actions>
        <v-btn @click="generate_item">NEW</v-btn>
      </v-card-actions>
      <v-dialog v-model="dialog">
        <v-card v-if="generate">
          <v-card-title>New datatype</v-card-title>
          <v-card-text>
            <v-text-field v-model="generate.name" label="Name" />
            <datatype-picker v-model="generate.basis" />
          </v-card-text>
          <v-card-actions>
            <v-btn text @click="dialog = false">CANCEL</v-btn>
            <v-btn text @click="append()">ADD</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>

    <!-- default slot -->
    <template v-if="the_type">
      <datatype-form v-model="the_type" />
    </template>
    <template v-else>
      <v-card-text @click="generate">
        Generate New
      </v-card-text>

    </template>
  </editor-tab>
</template>
<script>
import Datatype from '@/models/datatype';
import { mapWritableState } from 'pinia';
import { useServiceStore } from '@/stores/service';
import { useEditorStore } from '@/stores/editor';

import editorTab from './editorTab.vue';
import editorList from '@/components//editorList.vue';
import datatypePicker from '@/components/datatypePicker.vue';
import datatypeForm from '@/components/datatypeForm.vue';

export default {
  name: 'datatypeTab',
  components: {
    editorTab,
    editorList,
    datatypePicker,
    datatypeForm,
  },
  methods: {
    generate_item() {
      this.dialog = true;
      console.log('generate_item');
      // this.generate = { name: null, basis: null };
    },
    append() {
      let type = new Datatype(this.generate.name, this.generate.basis);
      this.datatypes.push(type);
      this.editing.datatype = type;
      // dispose
      this.dialog = false;
    },
    remove() {
      this.datatypes = this.datatypes.filter(dt => dt != this.the_type);
      // this.the_type = null;
    }
  },
  computed: {
    dialog: {
      get() { return this.generate != null; },
      set(v) {
        console.log('dialog', v);
        this.generate = v ? { name: null, basis: null } : null;
      }
    },
    the_type: {
      get() { return this.editing.datatype; },
      set(v) { this.editing.datatype = v; },
    },
    alltypes() {
      return Datatype.all;
    },
    ...mapWritableState(useEditorStore, ['editing']),
    ...mapWritableState(useServiceStore, ['datatypes']),
  },
  data() {
    return {
      generate: null,
      primitives: Datatype.primitives,
    };
  },
}
</script>