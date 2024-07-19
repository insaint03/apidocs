<template>
  <ul class="items-tree" v-if="datatype.items!=null">
    <template v-for="node,ni in tree" :key="`item-tree.${root}.${ni}`">
      <li class="comment" :style="padding(node.lv)">
        <span>// {{ node.comment || node.summary }}</span>
      </li>
      <li class="node" :style="padding(node.lv)">
        <span class="prefix">{{ node.prefix }}</span>
        <span class="title">{{ node.title }}</span>
        <span class="required" v-show="node.required">*</span>
        <span class="suffix">{{ node.suffix }}</span>
        <span class="datatype">{{ inherits(node.type).join(' / ') }}</span>
        <span class="defaults" v-show="node.defaults">(={{ node.defaults }})</span>
      </li>
    </template>
  </ul>
</template>
<script>
import Datatype from '@/models/datatype';

const children_maps = {
  object: (it)=>({
    prefix: '',
    title: it.key,
    suffix: ':',
    type:it.datatype,
    required: it.required,
    defaults: it.defaults,
    comment: it.comment,
  }),
  array: (it)=>({
    prefix: '-',
    suffix: '',
    type: it,
  }),
  enum: (it)=>({
    prefix: '',
    suffix: ';',
    title: it.value,
    comment: it.desc,
  }),
};

export default {
  name: 'itemsTree',
  options: {
  },
  methods: {
    inherits(typename) {
      return Datatype.typeprop(typename, 'inherits') || [];
    },
    padding(lv) {
      return [
        `margin-left: ${8*lv}px`,
      ].join('; ');
    },
  },
  props: {
    root: String,
  },
  computed: {
    datatype() {
      return Datatype.find(this.root);
    },
    // build hierarchical tree rooted from the datatype
    tree() {
      // with root
      // const queue = [{prefix: '+', type: this.root, lv: 0}];
      let queue = this.datatype.item_items.map((it)=>({
        ...children_maps[this.datatype.origintype](it),
        lv: 0,
      }));
      const tree = [];

      while(0<queue.length) {
        const node = queue.shift();
        const _type = Datatype.find(node.type);
        tree.push({
          summary: _type.summary,
          ...node,
        });

        // appending children
        if(_type.items!=null) {
          const children = _type.item_items
            .map((it)=>({
              ...children_maps[_type.origintype](it), 
              lv:node.lv+1,
            }));
          queue = children.concat(queue);
        }
      }
      return tree;
    }
  },
  data() {
    return {};
  },

}
</script>
<style scoped>
ul.items-tree {
  list-style-type: none;
  padding: 0;
  background: #000;
  color: #ccc;
  padding-top: 16px;
  padding-bottom: 16px;
  border-radius: 4px;;
  
}

.items-tree li {
  text-indent: 4px;
  padding-left: 4px;
  border-left: 1px solid #333;
}

.items-tree .comment {
  /* opacity: 0.75; */
  color: #EC407A;
  font-style: italic;
  font-weight: light;
}

.items-tree .comment * {
  opacity: .9;
}

.items-tree .node {
  /* opacity: 0.75; */
}

.items-tree .prefix, .items-tree .suffix {
  font-weight: bold;
}

.items-tree .title {
  color: #fff;
  font-weight: bolder;
}

.items-tree .title .required {
  color: #EC407A;
}

.items-tree .datatype {
  opacity: .9;
  color: #66BB6A;
  margin-left: 1em;
  background-color: #333;
  padding-left: .5em;
  padding-right: .5em;
  border-radius: .5em;

}

</style>