<template>
  <v-row class="ma-0 pa-0">
    <v-col cols="8">
      <v-table density="compact">
        <thead>
          <tr>
            <th>
              <v-checkbox v-model="select_all" />
            </th>
            <th v-for="(field, fi) in fields" :key="`field-${field.key}.${fi}`" :cols="field.cols" :title="field.title">
              {{ field.title || field.label || field.key }}
            </th>
          </tr>
        </thead>
        <tbody style="max-height: 25vh; overflow-y: auto;">
          <tr v-for="(item, ii) in value" :key="`row-${ii}`" @click="toggle(ii)">
            <td>
              <v-checkbox :model-value="selected.includes(ii)" @update="(v) => toggle(v)" />
            </td>
            <td v-for="(field, fi) in fields" :key="`row-edit.${ii}x${fi}`">
              <slot :name="`value-${field.key}`" :item="item" :field="field" :value="item[field.key]">
                <v-checkbox v-if="field.is === 'v-checkbox'" readonly :model-value="item[field.key]" />
                <v-chip v-else-if="field.is === 'v-chip'" readonly>{{ item[field.key] }}</v-chip>
                <template v-else>{{ item[field.key] }}</template>
              </slot>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-col>
    <v-col cols="4">
      <v-card elevation="1" @keyup.enter="()=>has_select?apply():append()">
        <v-tabs v-model="tab">
          <v-tab value="form">form</v-tab>
          <v-tab value="yaml">yaml</v-tab>
          <v-tab value="json">json</v-tab>
        </v-tabs>
        <v-card-text>
          <v-window v-model="tab">
            <!-- form editor -->
            <v-window-item value="form">
              <template v-for="(field, fi) in fields" :key="`table-value.${field.key}-${fi}`">
                <slot :name="`item-${field.key}`" :item="generate" :field="field" :value="generate[field.key]">
                  <v-text-field :label="field.label || field.key" v-bind="{ ...inputBinds, ...field }"
                    v-model="generate[field.key]" />
                </slot>
              </template>
            </v-window-item>
            <!-- yaml editor -->
            <v-window-item value="yaml">
              <v-textarea v-model="yaml" placeholder="YAML" :rules="[validate_yaml]" @keyup.enter.stop  v-bind="text_editor_conf" />
            </v-window-item>
            <v-window-item value="json">
              <v-textarea v-model="json" placeholder="JSON" :rules="[validate_json]" @keyup.enter.stop v-bind="text_editor_conf" />
            </v-window-item>
          </v-window>
        </v-card-text>
        <v-card-actions>
          <v-btn :diabled="has_select" @click="append" text color="accent">New</v-btn>
          <v-spacer />
          <v-btn :disabled="!has_select" @click="apply" text color="primary">Save</v-btn>
        </v-card-actions>
      </v-card>

    </v-col>
  </v-row>
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
  },
  methods: {
    append() {
      if(this.items != null && 0<this.items.length) {
        this.value.push(...this.items);
      } else if(this.generate!=null) {
        this.value.push(Object.assign({}, this.generate));
      } else {
        this.value.push({});
      }
      // clear out
      this.generate = {};
      this.items = null;
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
      this.generate=this.get_common();
    },
    get_common() {
      return this.selected_values.reduce((agg, item) => {
        Object.entries(item)
          .filter(([k, v]) => v != null && agg[k] === undefined)
          .forEach(([k, v]) => {
            agg[k] = v;
          });
        Object.entries(agg)
          .filter(([k,v])=> v!=null && item[k] != v)
          .forEach(([k,])=> {
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
        if(values == null) {
          return null;
        }
        else if(values instanceof Array) {
          this.generate = values[0];
          this.items = values;
        } else {
          this.generate = values;
          this.items = null;
        }
        return null;
      } catch(e) {
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
  },
  data() {
    return {
      tab: 'form',
      selected: [],
      value: Object.assign([], this.modelValue),
      more: 1,
      yaml: null,
      yaml_error: null,
      json: null,
      json_error: null,
      generate: {},
      items: null,
      text_editor_conf: {
        validateOn: 'lazy-input',
        persistentPlaceholder: true,
      },
    };
  }
}
</script>