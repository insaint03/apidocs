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
        <v-col v-for="(cols,ci) in fields" :key="`edit-param.${ci}`">
          <!-- basis name -->
          <template v-for="field in cols" :key="`edit-param.${ci}-${field}`">
            <input-preset 
              v-model="value[field]" 
              :binds="bindings(field)"
              :fieldId="`parameter.${field}`" 
              @change="on_change(field, value[field])" 
            />
          </template>
<!-- LEGACY; 
          <input-preset v-model="value.name" fieldId="parameter.name" @change="updates('name', value.name)" />
          <v-text-field v-model="value.name" v-bind="bindings('name')" @change="updates('name', value.name)" />
          <component :is="items_is"
            v-model="value.items"
            v-bind="bindings('items')" @change="updates('items', value.items)"
            :fields="item_fields"
            item-title="key" item-value="name" item-subtitle="datatype" multi />
          <toggle-text v-model="value.defaults" v-bind="bindings('defaults')" @change="updates('defaults', value.defaults)" text="default value" />
          <toggle-text v-model="value.validation" v-bind="bindings('validation')" @change="updates('validation', value.validation)" text="validate function (js)" />
        </v-col>
        <v-col>
          
          <parameter-picker v-model="value.basistype" v-bind="bindings('basistype')" @change="(v)=>updates('basistype', v)" shaker />
          
          <toggle-text v-model="value.migration" text="export migration" @v-bind="bindings('migration')" @change="updates('migration')" />
          
          <desc-text v-model="value.description" @v-bind="bindings('description')" @change="updates('description', value.description)" />
-->
        </v-col>
      </v-row>
      <v-divider />
      <v-row v-if="singular">
        <v-col>
          <input-preset field-id="parameter.samples" v-model="value.samples"
            :fields="value.items || sample_fields" label="samples" 
            @change="on_change('samples', value.samples)"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
  <!-- on empty selection, create new -->
  <v-card v-else>
    <v-toolbar flat>
      <v-toolbar-title>bulk generator</v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
      </v-toolbar-items>
      <v-spacer />
      <v-toolbar-items>
        <v-btn text @click="bulk_generation">
          save
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card-text>
      <v-table>
        <thead>
          <tr>
            <th><v-checkbox /></th>
            <th>name</th>
            <th>datatype</th>
            <th>summary</th>
            <th>edit</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(g,gi) in generates" :key="`gen-row.${gi}`">
            <td><v-checkbox :model-value="generate_select.includes(gi)" @click="toggle_generate_select(gi)" /></td>
            <td><v-text-field v-model="g.name" /></td>
            <td><parameter-picker v-model="g.basistype" label="datatype" /></td>
            <td><v-text-field v-model="g.description" label="summary" placeholder="summary description"
              append-icon="mdi-plus-circle" @click:append="copy_generate(g)" 
              @keyup.tab="copy_generate(g)"/></td>
            <td>
              <v-btn icon @click="generates=generates.filter(g)"><v-icon>mdi-cancel-circle</v-icon></v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapWritableState, mapActions } from 'pinia';
import { useParameterStore } from '@/stores/parameter';
import inputPreset from '@/components/inputFields/inputPreset.vue';
import parameterPicker from '@/components/inputFields/parameterPicker.vue';
import Parameter from '@/models/parameter';

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
    inputPreset,
    parameterPicker,
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
      fields: [
        [
          'name',
          'items',
          'defaults',
          'validation',
        ],
        [
          'basistype',
          'description',
          'migration',
        ],
      ],
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