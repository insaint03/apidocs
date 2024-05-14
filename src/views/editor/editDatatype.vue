<template>
  <!-- empty bulk generator form -->
  <v-card v-if="value==null">
    <v-toolbar flat>
      <v-toolbar-title>generator</v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn text @click="bulk_generation">
          save
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card-text>
      <v-row v-for="g,gi in generates" :key="`edit-g.${gi}`">
        <v-col cols="1">
          <v-checkbox :model-value="generate_select.includes(gi)" @click="toggle_generate_select(gi)" />
        </v-col>
        <v-col cols="3">
          <v-text-field v-model="g.name" label="name" />
        </v-col>
        <v-col cols="3">
        <v-text-field v-model="g.basistype" label="datatype" />
        </v-col>
        <v-col cols="3">
          <v-text-field v-model="g.description" label="misc" />
        </v-col>
        <v-col cols="1">
          <v-btn icon><v-icon>mdi-plus</v-icon></v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
  <v-card v-else>
    <v-card-title>
    </v-card-title>
    <v-card-text>
      <table-form :fields="fields" v-model="value" />
    </v-card-text>
  </v-card>
</template>
<script>
import { mapWritableState, mapActions } from 'pinia';
import { useParameterStore } from '@/stores/parameter';
import tableForm from '@/components/forms/tableForm.vue';
const fields = [
  { key: 'name', label: 'name', desc: 'name' },
  { key: 'basistype', label: 'basistype', desc: 'basistype' },
  { key: 'description', label: 'description', desc: 'description', multi: true, },
  { key: 'defaults', label: 'defaults', desc: 'defaults' },
  { key: 'items', label: 'items', desc: 'items', multi: true },
  { key: 'migration', label: 'migration', desc: 'migration' },
  { key: 'validation', label: 'validation', desc: 'validation', multi: true },
  { key: 'samples', label: 'samples', desc: 'samples', multi: true },

]

const names_delim = /[\s,]+/;
const item_fields = [
  { key: 'key', label: 'key', required: true },
  { key: 'datatype', label: 'datatype', required: true, is: 'parameter-picker' },
]
const sample_fields = [
  { key: 'value', label: 'value', required: true,},
];

const item_fields_on_object = [
  { key: 'key', label: 'key', required: true },
  { key: 'datatype', label: 'datatype', required: true, is: 'parameter-picker' },
  { key: 'required', label: 'required', required: false, is: 'v-checkbox' },
]


export default {
  name: 'editDatatype',
  components: {
    tableForm,
  },
  watch: {
    editor() {
      // 
      this.value = this.editor.item || null;
    },
  },
  methods: {
    on_change(key, val) {
      this.value[key] = val;
      this.updates(key, val);
      this.last_updated = Date.now();
    },
    bindings(key) {
      let ret = null;
      if(key === 'items') {
        if(this.origintype === 'object') {
          ret = {
            component: 'list-values',
            fields: item_fields_on_object,
            label: 'items',
          };
        } else if(this.origintype === 'array') {
          ret = {
            component: 'parameter-picker',
            multi: true,
          };
        } else {
          ret = { component: 'v-divider' };
        }
      }
      return ret;
    },
    copy_generate(g) {
      this.generates.push({
        ...g,
        name: null,
      });
    },
    toggle_generate_select(gi) {
      if(this.generate_select.includes(gi)) {
        this.generate_select = this.generate_select.filter((g)=>g !== gi);
      } else {
        this.generate_select = this.generate_select.concat([gi]);
      }
    },
    bulk_generation() {
      this.appends(...this.generates);
      this.shake();
      this.generates = [{}];
    },
    ...mapActions(useParameterStore, [
      'unselect',
      'appends',
      'updates',
      'shake',
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
      return this.value.basistype || null;
    },
    items_is() {
      switch(this.origintype) {
        case 'object': return 'list-values';
        case 'array': return 'parameter-picker';
        default: return 'v-divider';
      }
    },
    ...mapWritableState(useParameterStore, [
      'targets',
      'editor',
      'singular',
    ]),
  },
  data() {
    return {
      fields,
      generates: [{}],
      generate_select: [],
      // basis_new: 'string',
      // names_new: [],
      item_fields,
      sample_fields,
      value: null,
      last_updated: Date.now(),
    }
  }
}
</script>