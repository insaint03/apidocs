<template>
  <v-textarea v-model="items.text"
    :label="$props.label || 'properties'"
    :name="$props.name || 'items'"
    v-bind="$thx.field"
    @focus="focused=true" @blur="changes"
  />
  <div v-show="focused">
    <v-divider>preview</v-divider>
    <v-list>
      <v-list-item v-for="(it,ii) in previews" :key="`items-field.${ii}`"
        :prepend-icon="it.icon">
        <v-list-item-title>
          {{ it.name }} 
          &nbsp;<v-chip size="small" v-if="it.inherits">{{ it.inherits.join(' / ') }}</v-chip>
        </v-list-item-title>
        <v-list-item-subtitle v-show="it.summary">
          //{{ it.summary }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </div>

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
  methods: {
    changes() {
      this.$emit('change', this.raw);
      this.focused = false;
      this.raw = null;
    },
    ...mapActions(useDatatypeStore, [
      'findtype',
      'updates',
    ]),
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
        return this.raw.text;
      },
      set(values) {
        this.raw.text = values;
      }
    },
    items() {
        const cls = {
          object: ObjectItems,
          array: ArrayItems,
          enum: EnumItems,
        }[this.origintype];
        if(this.raw == null
        || !(this.raw instanceof cls)) {
          this.raw = new cls();
          this.raw.value = this.values.items;
          // this.raw.value = this.values.items;
        }
        return this.raw;
    },
    previews() {
      return this.raw.items
        .map(parsed_map[this.origintype])
        .filter((it)=>it!=null);
    },
    ...mapWritableState(useDatatypeStore, [
      'datatypes',
    ]),
    ...mapState(useDatatypeStore, [
      // 'value_texts',
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
      raw: null,
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