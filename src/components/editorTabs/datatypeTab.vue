<template>
  <editor-tab title="datatype">
    <template #unfocused>
      <v-list>
        <v-list-item v-for="(dt, index) in datatypes" :key="`datatype-${dt.name}.${index}`" slim @click.stop="the_type=dt">
          <v-list-item-title>{{ dt.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ dt.basistype }}</v-list-item-subtitle>
        </v-list-item>
      </v-list>
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
    <v-sheet v-if="the_type">
      <!-- has type -->
      <v-toolbar dark>
        <v-toolbar-title>{{ the_type.name }} <v-chip>{{ the_type.basistype }}</v-chip></v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="remove">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <datatype-picker v-model="the_type.basistype" />
          <v-text-field v-model="the_type.summary" label="summary" />
          <v-text-field v-model="the_type.description" label="Description" />
          <template v-if="the_type.is_array">
            <v-select v-if="the_type.is_array" v-model="the_type.items" multiple :items="datatypes" label="item types"/>
          </template>
          <template v-else-if="the_type.is_object">
            <span>Object items</span>
          </template>
          <v-text-field v-model="the_type.example" label="Example" />
        </v-form>
      </v-card-text>
    </v-sheet>
    <v-sheet v-else>
      <v-card-text @click="generate">
        Generate New
      </v-card-text>
    </v-sheet>

  </editor-tab>
</template>
<script>
import Datatype from '@/models/datatype';
import { mapWritableState } from 'pinia';
import { useServiceStore } from '@/stores/service';
import { useEditorStore } from '@/stores/editor';

import editorTab from './editorTab.vue';
import datatypePicker from '@/components/datatypePicker.vue';

export default {
  name: 'datatypeTab',
  components: {
    editorTab,
    datatypePicker,
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
  watch: {
    the_type(ev) {
      console.log('the_type', this.the_type, ev, arguments);
    },
    dialog(ev) {
      console.log('dialog', this.dialog, ev, arguments);
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