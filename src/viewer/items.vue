<template>
  <!-- mode enum -->
  <enum-items-view v-if="mode_enum" :items="datatype.items" :label="label" />
  <!-- mode array -->
  <array-items-view v-else-if="mode_array" :items="datatype.items" :label="label" />
  <!-- mode object -->
  <object-items-view v-else-if="mode_object" :items="this.items" :label="label" :expending="expending" />
</template>
<script>
import Datatype from '@/models/datatype';
import enumItemsView from './enumItems.vue';
import arrayItemsView from './arrayItems.vue';
import objectItemsView from './objectItems.vue';

export default {
  name: 'itemsView',
  components: {
    enumItemsView,
    arrayItemsView,
    objectItemsView,
  },
  methods: {
    toggle_expand(it) {
      this.expended[it.key] = !this.expended[it.key];
    },
  },
  props: {
    // modelValue: String,
    datatype: Datatype,
    expending: {
      type: Boolean,
      default: true,
    },
    label: {
      type: String,
      default: ()=>'properties' 
    },
  },
  computed: {
    mode_enum() {
      return this.datatype.origintype === 'enum';
    },
    mode_array() {
      return this.datatype.origintype=== 'array';
    },
    mode_object() {
      return this.datatype.origintype === 'object';
    },
    items() {
      return this.datatype.items.map((it) => {
          const basis = Datatype.find(it.datatype, true);
          return {
            ...it,
            inherits: basis.inherits,
            basis: basis,
            items: basis.items,
            origin: basis.basistype || basis.origintype,
            title: basis.summary,
            misc: basis.description,
            expandable: basis.is_collective,
          }
      });
    },
    expand_all: {
      get() {
        return this.value.length === Object.keys(this.expended).length;
      },
      set(v) {
        if(v) {
          this.items
            .filter((it)=>this.expended[it.key]==null)
            .forEach((it)=>this.expended[it.key] = true);
        } else {
          this.expended = {};
        }
      }
    },
    expand_all_icon() {
      switch(this.expand_all) {
        case true: return 'mdi-chevron-up';
        case false: return 'mdi-chevron-down';
        default: return 'mdi-chevron-right';
      
      }
    }
  },
  data() {
    return {
      expended: {},
      value: this.modelValue,
    };
  }
}
</script>
<style scoped>
.items {
  background-color: inherit;
  color: inherit;
}
.key-cell {
  display: flex-inline;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.desc-cell {
  display: flex-inline;
  flex: 1 1 auto;
}
</style>