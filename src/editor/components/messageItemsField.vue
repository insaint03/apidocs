<template>
  <v-textarea v-model="texts"
    :disabled="disabled"
    :label="label" v-bind="$thx.field"
    @focus="focused=true" @blur="changes" />
  <div v-show="focused">
    <v-divider>preview</v-divider>
    <v-list slim density="compact">
      <v-list-item v-for="it,ii in items" :key="`msg-item.${ii}-${it.key}`"
        :prepend-icon="it.required ? 'mdi-exclamation' : 'mdi-blank'">
        <v-list-item-title>
          {{ it.key }}
          &nbsp; <v-chip v-if="it.inherits" size="small">{{ it.inherits }}</v-chip>
        </v-list-item-title>
        <v-list-item-subtitle>
          <span v-if="it.comment">// {{ it.comment }}</span>
          <span v-else-if="it.summary">// {{ it.summary }}</span>
          <v-spacer />
          <span v-if="it.defaults">= {{ it.defaults }}</span>
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </div>
</template>
<script>
import Patterns from '@/models/patterns.js';
import Datatype from '@/models/datatype.js';

const model_mode = (mvalue)=>{
  if(Array.isArray(mvalue)) {
    return 'array';
  } else if(typeof(mvalue)==='object') {
    return 'object';
  } else {
    return 'string';
  }
}

const serializes = (values)=>{
  return {
    array: ((vs)=>vs.map((v)=>typeof(v)==='string'?v:Patterns.item_serialize(v)).join('\n')),
    object: ((vs)=>Object.entries(vs)
      .map(([k,v])=>Patterns.item_serialize({key:k, ...v}))
      .join('\n')),
    string: ((vs)=>vs),
  }[model_mode(values)](values);
}

export default {
  props: {
    modelValue: {
      type: [String, Object, Array],
      required: false,
      default: ()=>''
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    label: String,
  },
  methods: {
    changes() {
      // hide preview
      this.focused = false;
      // const lines = this.texts.split('\n')
      //   .filter((ln)=>ln!=null && 0<ln.length);
      const items = {
        array: this.items,
        object: Object.fromEntries(this.items.map((it)=>[it.key, it])),
        string: this.texts,
      }[this.model_mode];
      // update items
      this.$emit('update:model-value', items);
    },
    bindings(typename) {
      const t = Datatype.find(typename);
      return t  
        ? {
          inherits: (t.inherits || [typename]).join(' / '),
          summary: t.summary,
        }
        : {
          inherits: typename,
        };
    },
  },
  watch: {
    modelValue() {
      this.texts = serializes(this.modelValue);
    },
  },
  computed: {
    model_mode() {
      return model_mode(this.modelValue);
    },
    items() {
      return this.texts
        .split('\n').map((ln)=>ln.trim())
        .filter((ln)=>ln!=null && 0<ln.length)
        .map(Patterns.item_parse)
        .filter((v)=>v!=null && v.key && v.datatype)
        .map((it)=>({
          ...this.bindings(it.datatype), 
          ...it}));
    },

  },
  data() {
    return {
      focused: false,
      texts: '',
    }
  },
  unmounted() {
    this.changes();
  }
};
</script>