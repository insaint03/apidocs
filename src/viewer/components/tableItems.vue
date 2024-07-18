<template>
  <v-divider>{{ label }}</v-divider>
  <template v-if="!items || items.length<=0">
    <v-list-item disabled style="text-align: center;">
      
    </v-list-item>
  </template>
  <template v-else>
    <v-list-item v-for="it,ii in items" :key="`items-${label}.${ii}`"
      :prepend-icon="it.required ? 'mdi-exclamation' : 'mdi-blank'">
      <v-list-item-subtitle v-show="summary[ii]">
        // {{ summary[ii] }}
      </v-list-item-subtitle>
      <v-list-item-title>
        <strong>{{ it.key }}</strong> :&nbsp;
        <v-chip size="small">{{ inherits[ii] }}</v-chip>
      </v-list-item-title>
      <items-tree :root="it.datatype" />
    </v-list-item>

  </template>
</template>
<script>
import Datatype from '@/models/datatype';
import itemsTree from '@/viewer/components/itemsTree.vue';

export default {
  name: 'tableItemsView',
  components: {
    itemsTree,
  },
  methods: {
    typeprop(name, key) {
      return Datatype.typeprop(name, key);
    },
  },
  computed: {
    typed() {
      return this.items.map((it)=>Datatype.find(it.datatype));
    },
    inherits() {
      return this.typed.map((t)=>t.inherits.join(' / '));
    },
    summary() {
      return this.typed.map((t)=>t.summary);
    },
  },
  props: {
    items: Array,
    label: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
    };
  }
}
</script>