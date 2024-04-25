<template>
  <v-window continuous show-arrows="hover" v-model="modes">
    <!-- text separate values -->
    <v-window-item value="text">
      <v-sheet>
        <v-toolbar flat density="compact">
          <v-tabs>
            <v-tab v-for="f in fields" :key="`tab-${f.key}`" @click="tab = f.key" :value="f.key" :title="f.title">
              {{ f.title || f.label || f.key }}
            </v-tab>
          </v-tabs>
          <v-spacer />
          <v-menu>
            <template #activator="{ props }">
              <v-btn text v-bind="props">{{ text_separator }}</v-btn>
            </template>
            <v-list-item v-for="sep in text_separators" :key="`sep-${sep}`" @click="text_separator = sep" :title="sep" />
          </v-menu>
        </v-toolbar>
        <v-textarea v-model="separated_values" />
      </v-sheet>
    </v-window-item>
    <!-- table control -->
    <v-window-item value="table">
      <v-table density="compact">
        <thead>
          <tr>
            <!-- checkbox column -->
            <th>
              <v-checkbox v-model="select_all" />
            </th>
            <!-- field column -->
            <th v-for="(field, fi) in fields" :key="`field-${field.key}.${fi}`" :cols="field.cols" :title="field.title">
              {{ field.title || field.label || field.key }}
            </th>
            <!-- action -->
            <th>
              <v-btn icon flat @click="append">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, ii) in value" :key="`row-${ii}`">
            <td>
              <v-checkbox :model-value="selected.includes(ii)" @update="(v) => toggle(v)" @click="toggle(ii)" />
            </td>
            <td v-for="(field, fi) in open_fields" :key="`row-edit.${ii}x${fi}`">
              <slot :name="`value-${field.key}`" :item="item" :field="field" :value="item[field.key]">
                <component :is="field_components[field.key]" hide-details="auto" single-line variant="underlined"
                  v-bind="item"
                  v-model="item[field.key]" />
              </slot>
            </td>
            <td>
              <v-btn icon flat>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td :colspan="open_fields.length + 2">
              <v-toolbar flat dense>
                <v-text-field v-model="search" label="Search" outlined prepand-icon="mdi-magnify" />
                <v-spacer />
                <v-toolbar-items>
                  <v-btn icon flat @click="append">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-toolbar-items>
              </v-toolbar>
            </td>
          </tr>
        </tfoot>
      </v-table>
    </v-window-item>
    <!-- serializer -->
    <v-window-item value="serializer">
      <v-sheet>
        <v-toolbar flat density="compact">
          <v-tabs>
            <v-tab v-for="(ser, si) in Object.keys(serializer)" :key="`ser-${ser}.${si}`" @click="tab = ser" :value="ser" :title="ser">
              {{ ser }}
            </v-tab>
          </v-tabs>
          <v-spacer />
          <v-btn icon @click="apply">
            <v-icon>mdi-check</v-icon>
          </v-btn>
        </v-toolbar>
        <v-textarea v-model="serialize_values" />
      </v-sheet>
    </v-window-item>
  </v-window>
</template>

<script>
import yaml from 'js-yaml';

export default {
  name: 'tableValues',
  components: {
  },
  props: {
    binds: {
      type: Object,
      required: false,
    },
    inputBinds: {
      type: Object,
      required: false,
      default: () => ({
        flat: true,
        singleLine: true,
        hideDetails: true,
        clearable: true,
        variant: 'underlined',
      }),
    },
    fields: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: Array,
      required: false,
    },
    blank: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    mode: {
      type: String,
      required: false,
      default: 'table',
    }
  },
  methods: {
    append() {
      this.value.push(Object.assign({}, this.blank));
    },
    apply() {
      this.selected_values.forEach((item) => {
        Object.entries(this.generate)
          .filter(([k, v]) => v != null)
          .forEach(([k, v]) => item[k] = v);
      });
      this.$emit('update:modelValue', this.value);
    },
    toggle(v) {
      if (this.selected.includes(v)) {
        this.selected = this.selected.filter((s) => s !== v);
      } else {
        this.selected.push(v);
      }
      this.generate = this.get_common();
    },
    get_common() {
      return this.selected_values.reduce((agg, item) => {
        Object.entries(item)
          .filter(([k, v]) => v != null && agg[k] === undefined)
          .forEach(([k, v]) => {
            agg[k] = v;
          });
        Object.entries(agg)
          .filter(([k, v]) => v != null && item[k] != v)
          .forEach(([k,]) => {
            agg[k] = null;
          });
        return agg;
      }, {});
    },
    set_common(key, value) {
      this.selected_values.forEach((v) => v[key] = value);
    },
    parse_items(parser, input) {
      try {
        let values = parser(input);
        // null out as soon
        if (values == null) {
          return null;
        }
        else if (values instanceof Array) {
          this.generate = values[0];
          this.items = values;
        } else {
          this.generate = values;
          this.items = null;
        }
        return null;
      } catch (e) {
        return e.toString();
      }
    },
    validate_yaml() {
      this.yaml_error = this.parse_items(yaml.load, this.yaml || '');
      return this.yaml_error == null ? true : this.yaml_error;
    },
    validate_json() {
      this.json_error = this.parse_items(JSON.parse, this.json || '');
      return this.json_error == null ? true : this.json_error;
    },
  },
  computed: {
    has_select() {
      return 0 < this.selected.length;
    },
    select_all: {
      get() {
        return this.has_select
          && this.selected.length === this.value.length;
      },
      set(v) {
        this.selected = v ? this.value.map((x, i) => i) : [];
        this.generate = this.get_common();
      }
    },
    selected_values() {
      return this.selected.map((i) => this.value[i]);
    },
    field_components() {
      return Object.fromEntries(this.fields.map((f) => [f.key, f.is || 'v-text-field']));
    },
    open_fields() {
      return this.fields.filter((f) => !f.menu);
    },
    separated_values: {
      get() {
        return this.value.map((it) => it.join(this.text_separator)).join('\n');
      },
      set(v) {
        this.value = v.split('\n').map((it) => it.split(this.text_separator));
      }
    },
    serialize_values: {
      get() {
        try {
          return this.serialize(this.value);
        } catch(ex) {
          return '';
        }
      },
      set(v) {
        try {
          this.value = this.deserialize(v);
        } catch(ex) {
          this.serialize_error = ex.toString();
        }
      }
    },

  },
  data() {
    return {
      tab: 'form',
      selected: [],
      value: this.modelValue,
      more: 1,
      yaml: null,
      yaml_error: null,
      json: null,
      json_error: null,
      generate: {},
      search: null,
      items: null,
      text_editor_conf: {
        validateOn: 'lazy-input',
        persistentPlaceholder: true,
      },
      modes: this.mode,
      text_separator: ',',
      text_separators: [',', ';', '|', ],
      serializer: {
        json: {
          forth: JSON.stringify,
          back: JSON.parse,
        },
        yaml: {
          forth: yaml.dump,
          back: yaml.load,
        },
      },
      serialize_error: null,
    };
  }
}
</script>