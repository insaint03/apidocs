<template>
  <editor-tab title="datatype">
    <template #unfocused>
      <v-tabs v-model="the_type" direction="vertical" show-arrows>
        <v-tab v-for="(dt, index) in datatypes" :key="`editor-datatype-${dt.name}.${index}`" @click.stop="the_type=dt">
          {{ dt.name }}
        </v-tab>
      </v-tabs>
    </template>

    <!-- default slot -->
    <v-window v-model="the_type">
      <v-window-item :value="the_type">
        <v-card v-if="the_type">
          <v-card-actions>
            {{ the_type.name }}
            <v-spacer />
            <v-btn icon @click="remove"><v-icon>mdi-trash</v-icon></v-btn>
          </v-card-actions>
          <v-form>
            <v-text-field v-model="the_type.name" label="Name" />
            <v-text-field v-model="the_type.basis" label="Basis" />
            <v-text-field v-model="the_type.description" label="Description" />
            <v-text-field v-model="the_type.example" label="Example" />
          </v-form>
        </v-card>
      </v-window-item>
    </v-window>
    

    <template #actions>
      <v-card-actions>
        <v-btn text @click="dialog=true">ADD</v-btn>
      </v-card-actions>
      <v-dialog v-model="dialog">
        <v-card v-if="generate">
          <v-card-title>New datatype</v-card-title>
          <v-card-text>
            <v-text-field v-model="generate.name" label="Name" />
            <v-autocomplete v-model="generate.basis" :items="alltypes" item-value="name" item-title="name" auto-select-first />
          </v-card-text>
          <v-card-actions>
            <v-btn text @click="dialog=false">CANCEL</v-btn>
            <v-btn text @click="append()">ADD</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>

  </editor-tab>
</template>
<script>
import Datatype from '@/models/datatype';
import { mapWritableState } from 'pinia';
import { useServiceStore } from '@/stores/service';

import editorTab from './editorTab.vue';
export default {
  name: 'datatypeTab',
  components: {
    editorTab,
  },
  methods: {
    append() {
      this.datatypes.push(this.generate);
      this.dialog = false;
    },
    remove() {
      this.datatypes = this.datatypes.filter(dt => dt != this.the_type);
      this.the_type = null;
    }
  },
  computed: {
    dialog: {
      get() { return this.generate != null; },
      set(v) { 
        this.generate = v ? {name: null, basis: null} : null;
      }
    },
    alltypes() {
      return Datatype.all;
    },
    ...mapWritableState(useServiceStore, ['datatypes']),
  },
  data() {
    return {
      the_type: null,
      generate: null,
      primitives: Datatype.primitives,
    };
  },
}
</script>