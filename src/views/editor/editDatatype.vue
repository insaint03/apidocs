<template>
  <!-- on has selection -->
  <v-card v-if="singular !== null && value != null" :key="`edit.dt-${singular}`">
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
    <!-- parameter form -->
    <v-card-text>
      <v-row>
        <!-- basis property area -->
        <v-col>
          <!-- basis name -->
          <v-text-field v-model="value.name" v-bind="bindings('name')" @change="updates('name', value.name)" />
          <!-- items -->
          <component :is="items_is"
            v-bind="bindings('items')" @change="updates('items', value.items)"
            :fields="item_fields"
            item-title="key" item-value="name" item-subtitle="datatype" multi />
          <!-- defaults -->
          <toggle-text v-model="value.defaults" v-bind="bindings('defaults')" @change="updates('defaults', value.defaults)" text="default value" />
          <!-- validation -->
          <toggle-text v-model="value.validation" v-bind="bindings('validation')" @change="updates('validation', value.validation)" text="validate function (js)" />
        </v-col>
        <v-col>
          <!-- datatype picker -->
          <parameter-picker v-model="value.basistype" v-bind="bindings('basistype')" @change="(v)=>updates('basistype', v)" shaker />
          <!-- migration -->
          <toggle-text v-model="value.migration" text="export migration" @v-bind="bindings('migration')" @change="updates('migration')" />
          <!-- description -->
          <desc-text v-model="value.description" @v-bind="bindings('description')" @change="updates('description', value.description)" />
        </v-col>
      </v-row>
      <v-divider />
      <v-row v-if="singular">
        <v-col>
          <table-values v-model="samples" :fields="value.items || sample_fields" label="samples"
            item-title="value" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
  <!-- on empty selection, create new -->
  <v-card v-else>
    <v-toolbar flat>
      <v-toolbar-title>bulk generator</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-row>
        <v-col>
          <v-textarea v-model="bulk_names" label="names" hint="delimited by space, newlines" />
        </v-col>
        <v-col>
          <parameter-picker v-model="basis_new" label="common_basis" />
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
// import fields from '@/fields';
import Parameter from '@/models/parameter';

import parameterPicker from '@/components/inputFields/parameterPicker.vue';

import listValues from '@/components/inputFields/listValues.vue';
import tableValues from '@/components/inputFields/tableValues.vue';
import inputFields from '@/components/inputFields'

import { mapWritableState, mapActions } from 'pinia';
import { useDatatypeStore } from '@/stores/datatype';

const names_delim = /[\s,]+/;
const item_fields = [
  { key: 'key', label: 'key', required: true },
  { key: 'datatype', label: 'datatype', required: true, is: 'parameter-picker' },
]
const sample_fields = [
  { key: 'value', label: 'value', required: true,},
];

export default {
  name: 'editDatatype',
  components: {
    tableValues,
    listValues,
    parameterPicker,

    ...inputFields,
  },
  methods: {
    create_bulk() {
      this.appends(this.basis_new, ...this.names_new)
    },
    bindings(key) {
      let rets = {
        label: key,
        disables: this.editor.disables.includes(key),
      };
      if(key==='items') {
        rets = {
          ...rets,
          shaker: false,
          itemTitle: this.origintype === 'array' ? 'name' : 'key',
          itemSubtitle: this.origintype === 'object' ? 'datatype' : null, 
          itemValue: this.origintype === 'array' ? 'name' : 'key',
          multi: true,
        };
      }
      return rets;
    },
    ...mapActions(useDatatypeStore, [
      'unselect',
      'appends',
      'updates',
      'shake',
    ]),
  },
  watch: {
    editor() {
      // 
      this.value = this.editor.item || null;
    },
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
      get() { return this.names_new.map((n) => n.trim()).join('\n'); },
      set(v) { this.names_new = v.split(names_delim).filter((n) => n.trim()); }
    },
    samples: {
      get() { return this.value.samples || []; },
      set(v) { this.value.samples = v; },
    },
    item() {
      return this.editor.item;
    },
    origintype() {
      return (Parameter.find(this.value.basistype) || {}).origintype;
    },
    items_is() {
      switch(this.origintype) {
        case 'object': return 'list-values';
        case 'array': return 'parameter-picker';
        default: return 'v-divider';
      }
    },
    ...mapWritableState(useDatatypeStore, [
      'targets',
      'editor',
      'singular',
    ]),
  },
  data() {
    return {
      // fields,
      basis_new: 'string',
      names_new: [],
      item_fields,
      sample_fields,
      value: null,
    }
  }
}
</script>