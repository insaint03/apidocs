<template>
  <v-table>
    <tbody>
      <tr v-for="({level,item},row) in items" :key="`tv-${row}.${level}`">
          <!-- level indentation -->
          <td :colspan="level">&nbsp;</td>
          <!-- keyname -->
          <td :colspan="levels-level">
            <slot name="row" :level="level" :levels="levels" :item="item" :row="row">
              {{ item }}
            </slot>
          </td>
      </tr>
    </tbody>
  </v-table>
</template>
<script>
export default {
  name: 'treeItemsView',
  props: {
    modelValue: {
      type: [Array, Object]
    },
    children: {
      type: [String, Function],
      default: 'items',
    },
  },
  computed: {
    items() {
      const queue = [].concat({level: 1, item: this.value});
      const ret = [];
      const childs = typeof(this.children)==='function'
        ?this.children()
        :(it)=>it[this.children];
      
      while(0<queue.length) {
        const {level, item} = queue.shift();
        const _children = childs(item);
        const has_child = _children && 0<_children.length;
        ret.push({level, item, has_child});
        if(has_child) {
          queue.push(...childs(item).map((it)=>({level: level+1, item: it})));
        }
      }
      return ret;
    },
    levels() {
      return this.items.reduce((acc, it)=>Math.max(acc, it.level), 0);
    },
  },
  data() {
    return {
      value: Array.isArray(this.modelValue) ? this.modelValue : [this.modelValue],
    }
  }
}
</script>