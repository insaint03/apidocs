<template>
  <v-list :color="$thx.color.markdown">
    <v-list-item class="pa-0">
      <v-textarea 
        :model-value="value" @update:model-value="($ev)=>$emit('update:modelValue', $ev)"
        v-bind="$thx.field"
        :label="label"
        :rules="[liner_parse, keytype_match]"
        placeholder="(keytype) title <link1,link2|anchor> and optional longlong description"
        hint="(keytype) title <link> desc; keytype and title are required"
        @focus="focused=true" @blur="focused=false"
      />
      <div v-show="focused">
        <v-divider>preview</v-divider>
        <liner-list-group :items="items" :icons="icons" editable />
      </div>
    </v-list-item>
  </v-list>
</template>
<script>
// import Liner from '@/models/meta/liner'
import linerListGroup from '@/viewer/components/linerListGroup.vue';

export default {
  name: 'multiLinerFields',
  components: {
    linerListGroup,
  },
  methods: {
    liner_parse() {
      this.items.forEach((p,index)=>{
        const line = index +1;
        if(p.keytype==null) {
          return `leading (keytype) required at line[${line}]`
        }
        else if(!(p.title && 0<p.title.trim().length)) {
          return `(...) title required at line[${line}]`
        }
      });
      return true;
    },
    keytype_match() {
      this.items.forEach((p, index)=>{
        const line = index +1;
        if(this.keytypes && 0<this.keytypes.length) {
          if(!this.keytypes.includes(p.keytype)) {
            return `keytype must be one of ${this.keytypes.join(',')} at line[${line}]`;
          }
        }
      });
      return true;
    },
  },
  props: {
    modelValue: {type: String},
    items: {type:Array},
    keytypes: {type: Array, required: false },
    label: {type: String, required: false },
    icons: {type: Object, required: false},
  },
  computed: {
    value: {
      get() { return this.modelValue; },
      set(value) { this.$emit('update:modelValue', value); } 
    },
    // parsed() {
    //   return this.value.split('\n')
    //     .map(Liner.parse)
    //     .filter((it)=>it!=null);
    // },
    // parsed: {
    //   get() {
    //     return this.value.trim()
    //       ? this.value.split('\n').map(Patterns.liner_parse)
    //       : [];
    //   },
    //   set() {
    //     // TODO
    //   }
    // }
  },
  data() {
    return {
      focused: false,
      // value: (this.modelValue||[]).map(Patterns.liner_serialize).join('\n'),
    }
  }
}
</script>