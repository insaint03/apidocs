<template>
  <items-object-field v-if="is_object" :label="label" :disabled="disabled" />
  <div v-else class="d-flex flex-fill flex-wrap justify-space-evenly">
    <!-- editor mode -->
    <v-list theme="dark" class="flex-fill">
      <v-list-subheader>items</v-list-subheader>
      <v-list-item 
        class="border-t-thin"
        v-for="(it,ii) in items" :key="`datatype-item-${ii}`"
        prepend-icon="mdi-package">
        <template v-if="is_array">
          <v-list-item-title>
            <v-chip>{{ basis_prop(it).join(' / ') }}</v-chip>
          </v-list-item-title>
          <v-list-item-subtitle>
            // {{ summary_prop(it) }}
          </v-list-item-subtitle>
        </template>
        <template v-else-if="is_enum">
          <v-list-item-title>{{ it.value }}</v-list-item-title>
          <v-list-item-subtitle>{{ it.desc }}</v-list-item-subtitle>
        </template>
        <template #append>
          <v-btn icon flat @click="items.splice(ii,1)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-list-item>
      <v-divider />
      <!-- adding fields item -->
      <v-list-item>
        <v-autocomplete v-if="is_array" v-bind="$thx.field"
          single-line auto-select-first item-title="name" item-value="name"
          :items="alltypes"
          v-model="puts.datatype"
          @change="add_item(puts.datatype)" />
        <div v-else-if="is_enum" class="d-flex flex-fill justify-between">
          <v-text-field v-model="puts.value" label="value" v-bind="$thx.field" />
          <v-text-field v-model="puts.desc" label="desc" v-bind="$thx.field" />
        </div>
      </v-list-item>
    </v-list>
    <!-- raw mode -->
    <div class="flex-fill pa-1">
      <v-textarea :model-value="texts" :disabled="disabled" v-bind="$thx.field"
        @change="($ev)=>texts=$ev.target.value" />
    </div>
  </div>
</template>
<script>
import Datatype from '@/models/datatype';
import Patterns from '@/models/patterns';

import itemsObjectField from './itemsObjectField.vue';

import { mapActions, mapState, mapWritableState } from 'pinia';
import { useDatatypeStore } from '@/stores/datatype';


export default {
  name: 'itemsField',
  components: {
    itemsObjectField,
  },
  watch: {
    // items() {
    //   this.$emit('change', {target:{name: 'items', value:this.items}});
    // }
  },
  methods: {
    update_values(value) {
      this.$emit('change', {target:{name: 'items', value:(value || this.items)}});
    },
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
    
      // auto add 
      if(this.autopush) {
        this.add_object_item({ctrlKey:true, shiftKey:true});
      }
    },
    add_item(val) {
      if(this.is_array) {
        const value = this.items.concat(this.findtype(val));
        this.update_values(value);
        // clear selection
        this.puts.datatype = null;

      } else if(this.is_enum) {
        const value = {
          value: this.puts.value,
          desc: this.puts.desc,
        };
        this.update_values(value);
      }
    },
    remove_item(index) {
      this.items = this.items.splice(index, 1);
      this.update_values();
    },
    // add_object_item(ev) {
    //   if(false
    //   // check keyname set
    //   || (this.is_object && !(this.puts.key && this.puts.datatype))
    //   || (this.is_array && !this.puts.datatype)
    //   || (this.is_enum && !(this.puts.value))
    //   // or ctrl/shift key also pressed
    //   || !(ev.ctrlKey || ev.shiftKey)) {
    //     return;
    //   }
      
    //   // build newtype on non-primitive datatype selection
    //   let dtype = this.findtype(this.puts.datatype);
    //   if(!dtype || dtype.is_primitive) {
    //     const newtype = `${this.values.name}._${this.puts.key}`;
    //     dtype = Datatype.create(newtype, this.puts.datatype);
    //     dtype.summary = this.puts.summary;
    //     this.datatypes[newtype] = dtype;
    //   }
    //   const item = {
    //     key: this.puts.key,
    //     datatype: dtype.name,
    //     defaults: this.puts.defaults,
    //     required: this.puts.required,
    //   };
    //   this.values.items.push(item);
    //   // clear puts
    //   this.puts = {
    //     key: null,
    //     datatype: null,
    //     summary: null,
    //     defaults: null,
    //     required: false,
    //     summary_editable: true,
    //   };
    //   // focus back to key input
    //   this.$refs['item-key-input'].focus();
    // },
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
    hint() {
      return hints[this.origintype];
    },
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