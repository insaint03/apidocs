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
        @change="$emit('update:modelValue', parsed)"
        @focus="focused=true" @blur="focused=false"
       />
    </v-list-item>
    <div v-show="focused">
      <v-divider>preview</v-divider>
      <liner-list-group :items="[parsed]" :icons="icons" editable />
    </div>
  </v-list>
</template>
<script>
import Patterns from '@/models/patterns';
import linerListGroup from '@/viewer/components/linerListGroup.vue';

export default {
  name: 'linerField',
  components: {
    linerListGroup,
  },
  methods: {
    liner_parse() {
      if(this.parsed.keytype==null) {
        return 'leading (keytype) required'
      }
      else if(!this.parsed.title) {
        return '(...) title required'
      }
    },
    keytype_match() {
      if(this.keytypes && 0<this.keytypes.length) {
        return this.keytypes.includes(this.parsed.keytype) 
          || `keytype must be one of ${this.keytypes.join(',')}`;
      }
    },
    setfocus($ev) {
      console.log('focused', $ev.returnValue);

    }
  },
  props: {
    modelValue: {type: Object},
    keytypes: {type: Array, required: false },
    label: {type: String, required: false },
    icons: {type: Object, required: false},
  },
  computed: {
    parsed: {
      get() {
        return Patterns.liner_parse(this.value || '');
      },
      // set(value) {
      //   // TODO
      // }
    }
  },
  data() {
    return {
      focused: false,
      checked: [],
      value: Patterns.liner_serialize(this.modelValue),
    }
  }
}
</script>