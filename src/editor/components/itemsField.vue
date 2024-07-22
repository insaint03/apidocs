<template>
  <template v-if="values.items">
    <v-textarea v-model="texts"
      :label="$props.label || 'properties'"
      :name="$props.name || 'items'"
      v-bind="$thx.field"
      auto-grow
      @focus="focused=true" @blur="changes"
    />
    <div v-show="focused">
      <v-divider>preview</v-divider>
      <v-list>
        <v-list-item v-for="(it,ii) in previews" :key="`items-field.${ii}`"
          :prepend-icon="it.icon">
          <v-list-item-subtitle v-show="it.summary">
            //{{ it.summary }}
          </v-list-item-subtitle>
          <v-list-item-title>
            {{ it.name }} 
            &nbsp;<v-chip size="small" v-if="it.inherits">{{ it.inherits.join(' / ') }}</v-chip>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </div>
  </template>
</template>
<script>
import Datatype from '@/models/datatype';
import ObjectItems from '@/models/meta/objectItems';
import ArrayItems from '@/models/meta/arrayItems';
import EnumItems from '@/models/meta/enumItems';

// import itemsObjectField from './itemsObjectField.vue';


import { mapActions, mapState, mapWritableState } from 'pinia';
import { useDatatypeStore } from '@/stores/datatype';

const parsed_map = {
  object(v){
    if(!v) { return null; }
    const t = Datatype.find(v.datatype);
    return  t ? {
      icon: v.required ? 'mdi-exclamation' : 'mdi-blank',
      name: v.key,
      inherits: t.inherits || [v.datatype],
      summary: v.comment || t.summary ,
    } : {
      icon: 'mdi-blank',
      name: v.key,
      inherits: [v.datatype],
      summary: v.comment,
    }
  },
  array(v){
    const t= Datatype.find(v);
    return t ? {
      name: t.name,
      inherits: t.inherits,
      summary: t.summary,
    } :null;
  },
  enum: (v)=>{
    return {
      name: v.value,
      summary: v.desc,
    }
  },
};

export default {
  name: 'itemsField',
  components: {
    // itemsObjectField,
  },
  emits: [
    'change',
  ],
  watch: {
    selection() {
      this.init_values();
    }
  },
  methods: {
    init_values() {
      this.items = this.values.items;
    },
    changes() {
      this.$emit('change', this.items);
      this.focused = false;
      this.update_items(this.items);
    },
    ...mapActions(useDatatypeStore, [
      'findtype',
      'update_items',
    ]),
  },
  beforeMount() {
    this.init_values();
  },
  props: {
    // datatype: Object,
    name: String,
    modelValue: Array,
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
    texts: {
      get() {
        return this.items.text;
      },
      set(values) {
        this.items.text = values;
      }
    },
    items: {
      get() {
        return this.itemsInstance[this.origintype] || {};
      },
      set(vs) {
        if(!this.itemsInstance[this.origintype]) {
          return;
        }
        this.itemsInstance[this.origintype].value = vs;
      }
    },
    // items() {
    //   this.$set(this.raw, 'value', this.values.items);
    //   return this.raw;
    // },
    previews() {
      // set values first
      return this.items.items
        .map(parsed_map[this.origintype])
        .filter((it)=>it!=null);
    },
    ...mapWritableState(useDatatypeStore, [
      'datatypes',
    ]),
    ...mapState(useDatatypeStore, [
      // 'value_texts',
      'item_values',
      'selection',
      'values',
      'alltypes',
    ]),
  },
  data() {
    return {
      focused: false,
      // value: this.modelValue,
      raw_mode: false, 
      autopush: false,
      puts: {},
      itemsInstance: {
        object: new ObjectItems(),
        array: new ArrayItems(),
        enum: new EnumItems(),
      }
      // _raw: null,
    };
  },
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