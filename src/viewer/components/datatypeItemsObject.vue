<template>
  <v-list density="compact">
    <!-- starts -->
    <v-list-item :append-icon="noExpand ? null : $thx.expanding_icon(expand_all)">
      <v-list-item-title>
        <v-chip :color="$thx.color.datatype"> {{ datatype.inherits.join(' / ') }} {</v-chip>
      </v-list-item-title>
    </v-list-item>
    <!-- values -->
    <template v-for="it, ii in items" :key="`dt-item.${it.name}x${ii}`">
      <v-list-item 
        @click="expanded[ii] = expandables[ii]&&!expanded[ii]"
        prepend-icon="mdi-circle-medium"
        :append-icon="expandables[ii] ? $thx.expanding_icon(expanded[ii]) : null">
        <v-list-item-subtitle v-if="summary_of(it.datatype)">
          // {{ summary_of(it.datatype) }}
        </v-list-item-subtitle>
        <v-list-item-title>
          <strong>{{ it.key }} </strong>&nbsp;:
          <v-chip size="small">{{ inheritance(it.datatype).join(' / ') }}</v-chip>
        </v-list-item-title>
      </v-list-item>
      <v-list-item prepend-icon="mdi-blank" v-if="expandables[ii]" v-show="expanded[ii]">
        <v-row>
          <v-col v-if="it.desc">
            <mark-down :model-value="it.desc" />
          </v-col>
          <v-col>
            <items-tree :root="it.datatype" />
          </v-col>
        </v-row>
      </v-list-item>
    </template>
    <!-- ends -->
    <v-list-item>
      <v-list-item-title>
        <v-chip :color="$thx.color.datatype">} </v-chip>
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>
<script>
import Datatype from '@/models/datatype';
import itemsTree from '@/viewer/components/itemsTree.vue';

export default {
  name: 'datatypeItems',
  components: { 
    itemsTree 
  },
  methods: {
    inheritance(tp) {
      return Datatype.typeprop(tp, 'inherits');
    },
    summary_of(tp) {
      return Datatype.typeprop(tp, 'summary')
    },
    items_of(tp) {
      return Datatype.typeprop(tp, 'items');
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
        return this.expanded.every((v,i)=>!this.expandables[i] || this.expanded[i]);
      },
      set(v) {
        this.expanded.forEach((_,i)=>this.$set(this.expanded, i, this.expandables[i] ? v : false));
      }    
    },
    items() {
      return this.datatype.item_items;
    },
    expandables() {
      const ret = this.items.map((it)=>!this.noExpand &&
        (it.desc || Datatype.typeprop(it.datatype, 'items')!=null));
      return ret;
    }

  },
  data() {
    return {
      expanded: [],
    };
  }
}
</script>