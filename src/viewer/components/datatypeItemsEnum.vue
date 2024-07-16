<template>
  <v-list density="compact">
    <!-- starts -->
    <v-list-item :append-icon="noExpand ? null : $thx.expanding_icon(expand_all)"
      @click="expand_all = !noExpand && !expand_all">
      <v-list-item-title>
        <v-chip :color="$thx.color.datatype"> {{ datatype.inherits.join(' / ') }} &lt;</v-chip>
      </v-list-item-title>
    </v-list-item>
    <!-- values -->
    <template v-for="{value, desc}, ii in items" :key="`dt-item.${datatype.name}x${ii}`">
      <v-divider v-if="ii>0">or</v-divider>
      <v-list-item 
        prepend-icon="mdi-square-medium"
        @click="expanded[ii] = expandables[ii] && !expanded[ii]">
        <v-list-item-subtitle v-if="desc">
          // {{ desc }}
        </v-list-item-subtitle>
        <v-list-item-title>
          <strong>{{ value }}</strong>
        </v-list-item-title>
      </v-list-item>
    </template>
    <!-- ends -->
    <v-list-item>
      <v-list-item-title>
        <v-chip :color="$thx.color.datatype">&gt; </v-chip>
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>
<script>
import Datatype from '@/models/datatype';
export default {
  name: 'datatypeItemsArray',
  methods: {
    typeprop(name, key, defaults) {
      const dt = Datatype.find(name);
      return dt ? dt[key] : (defaults || null);
    },
    inheritance(tp) {
      return this.typeprop(tp, 'inherits', []);
    },
    summary_of(tp) {
      return this.typeprop(tp, 'summary', '');
    }
  },
  props: {
    datatype: Object,
    noExpand: {type: Boolean, required: false, default: false },
    label: {type: String, required: false, default: 'items' },
  },
  computed: {
    expand_all: {
      get() {
        return this.datatype.items.reduce((agg, it)=>agg && this.expanded[it.key], true);
      },
      set(v) {
        this.expanded = Object.fromEntries(this.datatype.items.map((it)=>[it.key, v]));
      }    
    },
    items() { return this.datatype.item_items; }
  },
  data() {
    return {
      expanded: [],
    };
  },
};
</script>