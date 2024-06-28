<template>
  <v-navigation-drawer class="fill-height pa-0"
    order="1"
    loctaion="left" :model-value="show" permanent>
    <v-list
      :color="$thx.color.datatype"
      @click.stop="selection=[]"
      multiple selectable slim>    
      <v-list-subheader>datatypes</v-list-subheader>
      <v-list-item>

      </v-list-item>
      <v-divider />
      <template v-for="origin,oi in origins" :key="`nav-left-datatype-${origin}.${oi}`">
        <v-divider v-if="oi!=0" />
        <v-list-subheader v-show="0<items[origin].length"
          @click.stop>{{ origin }}</v-list-subheader>
        <v-list-item 
          v-for="item,ii in items[origin]" :key="`nav-left.${origin}-${item.name}.${ii}`"
          @click.stop="($ev)=>selecting($ev, item.name)"
          :active="selection.includes(item.name)"
          :title="item.name" :value="item.name" />
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import Datatype from '@/models/datatype';
// Datatype origins sort order 
//  by object, enum, array, string, number, bytes, boolean.
// const datatype_origins = [
//   'object',
//   'enum',
//   'array',
//   'string',
//   'number',
//   'blob',
//   'boolean'
// ];



export default {
  name: 'datatypeTab',
  methods: {
    init() {
    },
    selecting(ev, it) {
      if(ev.ctrlKey) {
        // multiselect: select toggle
        this.selection
          = this.selection.includes(it)
            ? this.selection.filter((v)=>v!==it)
            : [...this.selection, it];
      } else {
        // single select: change the selection item
        this.selection = [it];
      }
      this.$emit('update:model-value', this.selection);
    },
  },
  props: {
    modelValue: {
      type: Array,
      required: true,
    },
    show: {
      type: Boolean,
      required: true,
    },
    datatypes: {
      type: Object,
      required: true,
    },
  },
  onUpdated() {

  },
  computed: {
    types() {
      return Object.values(this.datatypes)
        .filter(t=>!t.is_primitive);

    },
    pattern() {
      return this.search ? new RegExp(this.search, 'i') : null;
    },
    items() {
      let ret = Object.fromEntries(this.origins.map((origintype)=>[
        origintype,
        this.types
          .filter((v)=>v.origintype===origintype
          && !(this.pattern && !this.pattern.test(v.name)))
      ]));
      return ret;
    },
  },
  data() {
    return {
      search: null,
      value: this.modelValue,
      origins: Datatype.origins.map((d)=>d.name),
      open_groups: ['object','enum'],
      selection: [],
    }
  }
}
</script>