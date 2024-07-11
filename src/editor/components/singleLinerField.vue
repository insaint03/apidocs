<template>
  <v-list :color="$thx.color.markdown">
    <!-- format here -->
    <v-list-item class="pa-0">
      <v-text-field v-model="value" 
        v-bind="$thx.field"
        :label="label" 
        :rules="[liner_parse, keytype_match]"
        placeholder="(keytype) title <link1,link2|anchor> and optional longlong description"
        hint="(keytype) title <link> desc; keytype and title are required"
        @focus="focused=true" @blur="focused=false"
       />
    </v-list-item>
    <div v-show="focused">
      <v-divider>preview</v-divider>
      <liner-list-group :items="[item]" :icons="icons" editable />
    </div>
  </v-list>
</template>
<script>
import linerListGroup from '@/viewer/components/linerListGroup.vue';

export default {
  name: 'linerField',
  components: {
    linerListGroup,
  },
  methods: {
    liner_parse() {
      if(this.item.key==null) {
        return 'leading (keytype) required'
      }
      else if(!this.item.title) {
        return '(...) title required'
      }
    },
    keytype_match() {
      if(this.keytypes && 0<this.keytypes.length) {
        return this.keytypes.includes(this.item.keytype) 
          || `keytype must be one of ${this.keytypes.join(',')}`;
      }
    },
    setfocus($ev) {
      console.log('focused', $ev.returnValue);

    }
  },
  props: {
    modelValue: {type: String},
    item: { type: Object },
    keytypes: {type: Array, required: false },
    label: {type: String, required: false },
    icons: {type: Object, required: false},
  },
  computed: {
    value: {
      get() { return this.modelValue; },
      set(values) { this.$emit('update:modelValue', values); } 
    }
    // parsed: {
    //   get() {
    //     return Patterns.liner_parse(this.value || '');
    //   },
      // set(value) {
      //   // TODO
      // }
    // }
  },
  data() {
    return {
      focused: false,
      checked: [],
    }
  }
}
</script>