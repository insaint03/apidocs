<template>
  <v-card flat>
    <v-toolbar flat>
      <v-toolbar-title>
        {{ title }}
      </v-toolbar-title>
      <v-spacer />
      <v-chip text :disabled style="text-transform: none;">
        {{ values.origintype }}
      </v-chip>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-row>
          <v-col cols="3">
            <v-text-field :model-value="values.name" label="name" v-bind="$thx.field"
              name="name" @change="changes" />
          </v-col>
          <v-col cols="3">
            <v-text-field :model-value="values.basistype" label="basistype" v-bind="$thx.field" 
              :items="alltypes" item-title="name" item-value="name"
              name="basistype" @change="changes" />
          </v-col>
          <v-col cols="3">
            <v-checkbox disabled :model-value="values.is_primitive" label="is_primitive" v-bind="$thx.field"
              name="is_primitive" @change="changes" />
          </v-col>
          <v-col cols="3">
            <v-text-field :disabled="values.origintype!='object'" :model-value="values.migration" label="migration" v-bind="$thx.field" 
              name="desc" @change="changes"/>
          </v-col>
        </v-row>
        
        <markdown-field :model-value="values.description" label="description" v-bind="$thx.field" />
        <items-field v-if="values.items" label="items" name="items" @change="changes" />
        <v-divider>details</v-divider>
        
        <v-text-field disabled :model-value="values.defaults" label="defaults" v-bind="$thx.field" name="defaults" @change="changes" />
        <v-text-field disabled :model-value="values.validation" label="validation" v-bind="$thx.field" name="validation" @change="changes" />
        <v-text-field disabled label="examples" v-bind="$thx.field" name="examples" @change="changes" /> <!-- TODO: examples -->
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script>
import Datatype from '@/models/datatype';

import { mapActions, mapState, mapWritableState } from 'pinia';
import { useDatatypeStore } from '@/stores/datatype';

import markdownField from '@/components/markdownField.vue';
import itemsField from '../components/itemsField.vue';

// const datatype_properties = [
//   'name',
//   'basistype',
//   'origintype',
//   'description',
//   'items',
//   'migration',
//   'defaults',
//   'validation',
//   'examples',
// ];

export default {
  name: 'datatypeEditor',
  components: {
    markdownField,
    itemsField,
  },
  methods: {
    changes($ev) {
      return this.updates($ev.target.name, $ev.target.value);
    },
    ...mapActions(useDatatypeStore, [
      'updates',
      'appends',
    ]),
  },
  props: {
    // datatypes: Object,
    // selected_types: Array,
    // datatype: Object,
  },
  computed: {
    title() {
      const threshold = 3;
      const names = this.selection.slice(0,threshold).join(', ');
      const suffix = this.selection.length>3 
        ? `... & ${this.selection.length-threshold} others` 
        : '';
      return `${names}${suffix}`;
    },
    singular() {
      return this.selection.length===1;
    },
    type_inheritance() {
      return this.values.basistype
        ? Datatype.typeprop(this.values.basistype, 'inherits')
        : [];
    },
    datatype_items() {
      return this.origins.map((origintype)=>({
          title: origintype,
          value: `origin-${origintype}`,
          children: this.items[origintype]
            // custom type first
            .sort((l,r)=>!l.is_primitive && r.is_primitive ? -1 : 1)
            .map((ch)=>ch.name),
        }));
    },
    ...mapState(useDatatypeStore, [
      'keynames',
      
      'values',
      'selection',
      'alltypes',

      'has_select',
      'origins',
      'items',
    ]),
    ...mapWritableState(useDatatypeStore, [
      'datatypes',
    ]),
  },
  data() {
    return {
      // properties: datatype_properties,
    };
  }
}
</script>