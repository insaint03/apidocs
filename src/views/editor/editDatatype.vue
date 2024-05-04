<template>
  <!-- on has selection -->
  <v-card v-if="singular!=null" :key="`edit.dt-${singular}`">
    <v-toolbar flat density="compact">
      <v-toolbar-title>
        <v-chip-group>
          <v-chip v-for="it in targets" :key="`edit.title-${it.name}`">
          {{ it.name }}<sub>:{{ it.basistype }}</sub>
          </v-chip>
        </v-chip-group>
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn icon @click="unselect()">
          <v-icon>mdi-close-circle</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-row>
      <v-col>
        <!-- parameter form -->
        <base-form v-model="item" :fields="fields.parameters" :key="`fields-${item.name}.${item.basistype}`">
          <template #item-items>
            <v-divider v-if="!item.is_collective" />
            <list-values v-else-if="item.is_object" v-model="item.items" :fields="fields.items" />
            <parameter-picker v-else-if="item.is_array" v-model="item.items" />
          </template>
        </base-form>
      </v-col>
      <v-col>
        <!-- parameter descriptives -->
        <base-form v-model="item" :fields="fields.parameter_desc">
        </base-form>
      </v-col>
    </v-row>
    <v-row v-if="singular">
      <v-col>
        <list-values label="samples" v-model="item.samples" :fields="item.items || [{ key: 'key' }]" itemId="key"
          itemTitle="key" />
      </v-col>
    </v-row>
  </v-card>
  <!-- on empty selection, create new -->
  <v-card v-else>
    <v-toolbar flat>
      <v-toolbar-title>bulk generator</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-row>
      <v-col>
        <parameter-picker v-model="basis_new" label="common_basis" />
      </v-col>
      <v-col>
        <v-textarea v-model="bulk_names" label="names" hint="delimited by space, newlines" />
      </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn @click="create_bulk">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import fields from '@/fields';

import parameterPicker from '@/components/inputFields/parameterPicker.vue';
import baseForm from '@/components/forms/baseForm.vue';
// import tableValues from '@/components/inputFields/tableValues.vue';
import listValues from '@/components/inputFields/listValues.vue';

import { mapWritableState, mapActions } from 'pinia';
import { useDatatypeStore } from '@/stores/datatype';

const names_delim = /\s+/;

export default {
  name: 'editDatatype',
  components: {
    baseForm,
    // tableValues,
    listValues,
    parameterPicker,
  },
  methods: {
    create_bulk() {
      this.appends(this.basis_new, ...this.names_new)
    },
    ...mapActions(useDatatypeStore, [
      'unselect',
      'appends',
    ]),
  },
  props: {
    // modelValue: {
    //   type: Object,
    //   required: true,
    // },
    // disables: {
    //   type: Array,
    //   required: false,
    // },
    // singular: {
    //   type: Boolean,
    //   required: false,
    // }
  },
  computed: {
    bulk_names: {
      get() { return this.names_new.map((n)=>n.trim()).join('\n'); },
      set(v) { this.names_new = v.split(names_delim).filter((n)=>n.trim()); }
    },
    item() {
      return this.editor.item;
    },
    ...mapWritableState(useDatatypeStore, [
      'targets',
      'editor',
      'singular',
    ]),
  },
  data() {
    return {
      fields,
      basis_new: 'string',
      names_new: [],
    }
  }
}
</script>@/stores/datatype