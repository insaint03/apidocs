<template>
  <!-- object origin -->
  <v-table v-show="items!=null" class="item-field" theme="dark">
    <thead>
      <tr>
        <td colspan="3">
          <v-btn flat @click="autopush=!autopush"
            size="small"
            :title="autopush ? 'auto push' : 'manual push'"
            :active="autopush">
            <v-icon>mdi-auto-mode</v-icon>
          </v-btn>
          &nbsp;
          <v-label>{{ label }}</v-label>
        </td>
        <td colspan="2">
          <v-btn text flat v-bind="$thx.btn" @click="raw_mode=!raw_mode">
            {{ raw_mode ? 'raw' : 'table' }}
          </v-btn>
        </td>
      </tr>
    </thead>
    <tbody v-if="raw_mode">
      <tr>
        <td colspan="5">
          <v-textarea :model-value="texts"
            v-bind="$thx.field"
            :label="label"
            :disabled="disabled"
            @change="(ev)=>texts=ev.target.value" />
        </td>
      </tr>
      </tbody>
      <tbody v-else>
        <tr v-for="it,ii in items" :key="`it-field.item.${ii}`">
            <th class="item-key">
              <v-icon size="small" :title="it.required ? 'required' : 'optional'">
                {{ icon_required(it.required) }}
              </v-icon>
              {{ it.key }} :
            </th>
            <td class="item-datatype">
              <v-chip size="small">{{ basis_prop(it.datatype).join(' / ') }}</v-chip>
            </td>
            <td class="item-summary">
              // {{ summary_prop(it.datatype) }}
            </td>
            <td class="item-defaults">
              <span v-show="it.defaults">= {{ it.defaults }}</span>
            </td>
            <td class="item-action">
              <v-btn icon flat @click="items.splice(ii,1)">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </td>
        </tr>
      </tbody>
      <tfoot>
          <tr @keydown.enter="add_object_item">
            <td class="item-key">
              <v-text-field 
                ref="item-key-input"
                v-model="puts.key" label="key" v-bind="$thx.field"
                single-line
                :prepend-inner-icon="icon_required(puts.required)"
                @click:prepend-inner="puts.required=!puts.required"
                @keydown="check_key_required"
                @keydown.enter="add_object_item">
              </v-text-field>
            </td>
            <td class="item-datatype">
              <v-autocomplete label="datatype" v-bind="$thx.field" 
                single-line auto-select-first item-title="name" return-object
                :items="alltypes"
                :model-value="puts.datatype" @update:model-value="update_puttype">
                <template #prepend> : </template>
              </v-autocomplete>
            </td>
            <td class="item-summary">
              <v-text-field v-model="puts.summary" label="summary" v-bind="$thx.field"
                single-line hint="ctrl+enter to add"
                :disabled="!puts.summary_editable"
                @keydown.enter="add_object_item"
                >
                <template #prepend> // </template>
              </v-text-field>
            </td>
            <td class="item-defaults">
              <v-text-field v-model="puts.defaults" label="defaults" v-bind="$thx.field"
                single-line
                @keydown.enter="add_object_item">
                <template #prepend> = </template>
              </v-text-field>
            </td>
          </tr>
      </tfoot>
  </v-table>
</template>

<script>
import Datatype from '@/models/datatype';
import Patterns from '@/models/patterns';

import { mapActions, mapState, mapWritableState } from 'pinia';
import { useDatatypeStore } from '@/stores/datatype';

export default {
  name: 'itemsFieldObject',
  methods: {
    basis_prop(typename) {
      return Datatype.typeprop(typename, 'inherits');
    },
    summary_prop(typename) {
      return Datatype.typeprop(typename, 'summary');
    },
    icon_required(value) {
      return value ? 'mdi-exclamation' : 'mdi-blank';
    },
    check_key_required(ev) {
      if(ev.key==='!') {
        this.puts.required = !this.puts.required;
        ev.preventDefault();
        return false;
      }
      return true;
    },
    update_puttype(dtype) {
      this.puts.datatype = dtype.name;
      // 
      this.puts.summary_editable = dtype.is_primitive;
      this.puts.summary = dtype.summary;
      // console.log(this.puts);
      // auto add 
      if(this.autopush) {
        this.add_object_item({ctrlKey:true, shiftKey:true});
      }
    },
    add_object_item(ev) {
      if(false
      // check keyname set
      || (this.is_object && !(this.puts.key && this.puts.datatype))
      || (this.is_array && !this.puts.datatype)
      || (this.is_enum && !(this.puts.value))
      // or ctrl/shift key also pressed
      || !(ev.ctrlKey || ev.shiftKey)) {
        return;
      }
      
      // build newtype on non-primitive datatype selection
      let dtype = this.findtype(this.puts.datatype);
      if(!dtype || dtype.is_primitive) {
        const newtype = `${this.values.name}._${this.puts.key}`;
        dtype = Datatype.create(newtype, this.puts.datatype);
        dtype.summary = this.puts.summary;
        this.datatypes[newtype] = dtype;
      }
      const item = {
        key: this.puts.key,
        datatype: dtype.name,
        defaults: this.puts.defaults,
        required: this.puts.required,
      };
      this.values.items.push(item);
      // clear puts
      this.puts = {
        key: null,
        datatype: null,
        summary: null,
        defaults: null,
        required: false,
        summary_editable: true,
      };
      // focus back to key input
      this.$refs['item-key-input'].focus();
    },
    ...mapActions(useDatatypeStore, [
      'findtype',
      'updates',
    ]),
  },
  props: {
    // datatype: Object,
    // modelValue: Array,
    label: String,
    disabled: Boolean,
  },
  computed: {
    basis() {
      return this.values.basistype !=null
        ? Datatype.find(this.values.basistype)
        : null;
    },
    origintype() {
      return this.values.origintype;
    },
    is_object() {
      return this.origintype === 'object';
    },
    is_array() {
      return this.origintype === 'array';
    },
    is_enum() {
      return this.origintype === 'enum';
    },
    columns() {
      switch(this.origintype) {
        case 'array':
          return ['name', 'basistype', 'origintype', 'summary' ];
        case 'object':
          return ['key', 'datatype', 'defaults', 'summary'];
        case 'enum':
          return ['value', 'desc'];
      }
      return [];
    },
    items() {
      return this.values.items;
    },
    texts: {
      get() {
        const origin = this.origintype;
        const items = this.values.items;
        return (origin && items)
          ? Datatype.serialize_items(this.origintype, ...this.values.items)
          : '';
      },
      set(value) {
        const tokens = value.split('\n')
          .map((ln)=>ln.trim())
          .filter((ln)=>ln.length>0);
        let vals = null;
        // when object items, convert primitive type as new
        if(this.is_object) {
          vals = tokens.map(Patterns.item_parse)
            .map((it)=>{
              it.datatype=it.datatype.trim();
              const dtype = this.datatypes[it.datatype];
              if(!dtype || dtype.is_primitive) {
                const newtype = `${this.values.name}._${it.key}`;
                this.datatypes[newtype] = Datatype.create(newtype, it.datatype);
                if(it.comment) {
                  this.datatypes[newtype].description = it.comment;
                }
                return {
                  ...it,
                  datatype: newtype,
                };
              } else {
                return it;
              }
            });
        } 
        // or simply use Datatype.parse_items
        else {
          vals = Datatype.parse_items(this.origintype, ...tokens)
        }
        this.updates('items', vals);

        // console.log('text updated', values);
        // this.$emit('update:modelValue', values);

      },
    },
    ...mapWritableState(useDatatypeStore, [
      'datatypes',
    ]),
    ...mapState(useDatatypeStore, [
      'values',
      'alltypes',
    ]),
  },
  data() {
    return {
      // value: this.modelValue,
      raw_mode: false, 
      autopush: false,
      puts: {},
    };
  },
  mounted() {
  }
}
</script>
<style scoped>
.item-key {
  white-space: nowrap;
  width: 10%;
}
.item-datatype {
  white-space: nowrap;
  width: 10%;
}
.item-summary {
  font-style: oblique;;
  width: 85%;
}
.item-defaults {
  white-space: nowrap;
  width: 10%;
}
.item-action {
  white-space: nowrap;
  width: 5%;
}
</style>