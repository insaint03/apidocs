<template>
  <v-list density="compact">
    <!-- starts -->
    <v-list-item :append-icon="noExpand ? null : $thx.expanding_icon(expand_all)"
      @click="expand_all = !noExpand && !expand_all">
      <v-list-item-title>
        <v-chip :color="$thx.color.datatype"> {{ datatype.inherits.join(' / ') }} [</v-chip>
      </v-list-item-title>
    </v-list-item>
    <!-- values -->
    <template v-for="it, ii in item_types" :key="`dt-item.${datatype.name}x${ii}`">
      <v-divider v-if="ii>0">or</v-divider>
      <v-list-item 
        prepend-icon="mdi-minus"
        :append-icon="(!noExpand && expandables[ii]) ? $thx.expanding_icon(expanded[ii]) : null"
        @click="expanded[ii] = expandables[ii] && !expanded[ii]">
        <v-list-item-subtitle v-if="it.summary">
          // {{ it.summary }}
        </v-list-item-subtitle>
        <v-list-item-title>
          <v-chip size="small">{{ inheritance(it.name).join(' / ') }}</v-chip>
        </v-list-item-title>
      </v-list-item>
      <v-list-item v-if="!noExpand && expandables[ii]" v-show="expanded[ii]">
        <v-row >
          <v-col v-if="it.desc">
            <mark-down :model-value="it.desc" />
          </v-col>
          <v-col v-if="it.items!=null">
            <items-tree v-if="it.items" :root="it" />
          </v-col>
        </v-row>
      </v-list-item>
    </template>
    <!-- ends -->
    <v-list-item>
      <v-list-item-title>
        <v-chip :color="$thx.color.datatype">] </v-chip>
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>
<script>
import Datatype from '@/models/datatype';
import itemsTree from '@/viewer/components/itemsTree.vue';

export default {
  name: 'datatypeItemsArray',
  components: {
    itemsTree,
  },
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
    datatype: Datatype,
    noExpand: {type: Boolean, required: false, default: false },
    label: {type: String, required: false, default: 'items' },
  },
  computed: {
    expand_all: {
      get() {
        return this.expandables.reduce((agg, ex,ei)=>agg && (agg && ex && this.expanded[ei]), !this.noExpand);
      },
      set(v) {
          this.expanded = v 
            ? [].concat(this.expandables)
            : [];
        // this.expanded = Object.fromEntries(this.datatype.items.map((it)=>[it.key, v]));
      }    
    },
    item_types() {
      return this.datatype.items.map((it)=>Datatype.find(it));
    },
    expandables() {
      return this.item_types.map((d)=>d.desc || d.items!=null);
    }
  },
  data() {
    return {
      expanded: {},
    };
  },
};
</script>