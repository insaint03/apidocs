<template>
  <datatype-items-object v-if="datatype.is_object" v-bind="$props" />
  <datatype-items-array v-else-if="datatype.is_array" v-bind="$props" />
  <datatype-items-enum v-else-if="datatype.is_enum" v-bind="$props" />
</template>
<script>
import Datatype from '@/models/datatype';

import datatypeItemsObject from './datatypeItemsObject.vue';
import datatypeItemsArray from './datatypeItemsArray.vue';
import datatypeItemsEnum from './datatypeItemsEnum.vue';

const headers = {
  object: ' {',
  array: '-array of [',
  enum: 'emumeration <',
}
const footers = {
  object: '}',
  array: ']',
  enum: '>',

}
export default {
  name: 'datatypeItems',
  components: {
    datatypeItemsObject,
    datatypeItemsArray,
    datatypeItemsEnum,
  },
  methods: {
    typeprop(name, key) {
      const dt = Datatype.find(name);
      return dt ? dt[key] :null;
    },
    inheritance(tp) {
      return this.typeprop(tp, 'inherits');
    },
    summary_of(tp) {
      return this.typeprop(tp, 'summary')
    },

  },
  props: {
    datatype: Datatype,
    label: {type: String, required: false, default: 'items' },
  },
  computed: {
    expand_all: {
      get() {
        return this.datatype.items.reduce((agg,it)=>agg && this.expanded[it.key], true);
      },
      set(v) {
        this.expanded = Object.fromEntries(this.datatype.items.map((it)=>[it.key, v]));
      }    
    },
    header() {
      return headers[this.datatype.origintype];
    },
    footer() {
      return footers[this.datatype.origintype];
    },

  },
  data() {
    return {
      expanded: {},
    };
  }
}
</script>