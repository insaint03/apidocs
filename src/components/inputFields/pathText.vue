<template>
  <v-sheet>
    <v-toolbar density="comfortable" flat default>
        <v-text-field v-model="value" 
          label="path"
          placeholder="/path/[regexp]/<required>/(optional)"
          hide-details
          clearable 
          prepend-icon="" />
    </v-toolbar>
    <v-list>
      <v-list-item v-for="(frag,fi) in fragments" :key="`frag-${fi}`"
        append-icon="mdi-dots-vertical" @click="edit(frag, fi)" 
        v-bind="frag">
        {{  frag.error }}
      </v-list-item>
    </v-list>
  </v-sheet>
</template>
<script>
import Datatype from '@/models/datatype';

const has_type = (v)=>Datatype.name_exists(v);
const modes = {
  exact: 'mdi-format-text',
  paatern: 'mdi-format-regex',
};
const fragment_patterns = {
  constant:  {
    pattern: /^(?<title>[\w\d-_]+)$/i,
    icon: 'mdi-format-text',
    validate: {
      insignificance: (v)=>/[\w\d]+/.test(v),
    },
  },
  pattern:  {
    pattern: /^\[(?<title>.+)\]$/i,
    icon: 'mdi-format-text',
    validate: {
      invalid_type: (v)=>{ try { new RegExp(v); return true; } catch(e) { return false; }},
    },
  },
  variable_required:  {
    pattern: /^<(?<title>[\w\d_]+)>$/i,
    icon: 'mdi-format-text',
    validate: {
      no_such_type: has_type,
    },
  },
  variable_optional:  {
    pattern: /^\((?<title>[\w\d_]+)\)$/i,
    icon: 'mdi-format-text',
    validate: {
      no_such_type: has_type,
    },
  },
};

export default {
  name: 'pathText',
  methods: {
    frag_type(frag) {
      return Object.entries(fragment_patterns)
        .reduce((rs, [tp,content])=>{
          if(rs) { return rs; }

          let match = content.pattern.exec(frag);
          if(match==null) { return null; }
          return {
            title: match.groups.title,
            subtitle: tp,
            error: Object.entries(content.validate)
              .reduce((rs, [err, vfn])=>{
                if(rs) { return rs; }
                return vfn(match.groups.title) ? null : err;
              }, null)
          };
        }, null) || {};
    },
    toggle_mode() {
      this.mode = Object.keys(modes)
        .reduce((rs, m)=>m===this.mode ? '' : (rs=='null'?null:m), null);
    },
    edit(frag, index) {
      console.log('edit', frag, index);
    },
    append() {
      this.value += '/';
    },
  },
  props: {
    modelValue: { type: String, required: false },
  },
  computed: {
    mode_icon() {
      return modes[this.mode].icon;
    },
    fragments() {
      return (this.value || '').replace(/\s+/g, '').split('/')
        .filter((v)=>v.length>0)
        .map(this.frag_type);
    }
  },
  data() {
    return {
      mode: 'exact',
      value: this.modelValue,
    }
  }
}
</script>@/models/datatype