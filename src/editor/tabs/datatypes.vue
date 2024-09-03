<template>
  <tab-header :icon="$thx.icon.datatype" :color="$thx.color.datatype">
    <template #title>{{ title }}</template>
    <template #items>
      <v-btn flat text @click="clear" :color="$thx.color.danger" :disabled="selection.length<=0">
        delete
      </v-btn>
    </template>
  </tab-header>
  <v-card flat>
    <v-card-text :key="`datatype-updated.${last_updated}`">
      <v-form v-if="has_select">
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
              name="migration" @change="changes"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <markdown-field :model-value="values.description" label="description" name="description" @change="changes" />
            <v-text-field disabled :model-value="values.validation" label="validation" v-bind="$thx.field" name="validation" @change="changes" />
            <v-textarea disabled :model-value="values.defaults" label="defaults" v-bind="$thx.field" name="defaults" @change="changes" />
          </v-col>
          <v-col>
            <items-field label="items" name="items" @change="update_items" :model-value="values.items" />
          </v-col>
        </v-row>
        <v-divider>details</v-divider>
          <v-text-field disabled label="examples" v-bind="$thx.field" name="examples" @change="changes" /> <!-- TODO: examples -->
        
      </v-form>
      <v-form v-else>
        <v-row>
          <v-col cols="3">
            <v-textarea v-model="newtype.names" label="names" v-bind="$thx.field"
              :rules="[typename_duplication]"
              hint="separated by newline"
              name="name" 
              @keyup.ctrl.enter="create_newtype"
            />
          </v-col>
          <v-col cols="3">
            <v-autocomplete v-model="newtype.basistype" label="basistype" v-bind="$thx.field" 
              :items="alltypes" item-title="name" item-value="name"
              name="basistype" @change="changes" />
          </v-col>
          <v-col cols="3">
            <v-checkbox model-value="values.is_primitive" label="is_primitive" v-bind="$thx.field"
              name="is_primitive" @change="changes" />
          </v-col>
          <v-col cols="3">
            <v-btn flat text @click="create_newtype" :disabled="!can_save" :color="$thx.color.datatype">save</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script>
import Datatype from '@/models/datatype';

import { mapActions, mapState, mapWritableState } from 'pinia';
import { useDatatypeStore } from '@/stores/datatype';

import tabHeader from '../components/tabHeader.vue';
import markdownField from '@/components/markdownField.vue';
import itemsField from '../components/itemsField.vue';

export default {
  name: 'datatypeEditor',
  components: {
    tabHeader,
    markdownField,
    itemsField,
  },
  methods: {
    async changes($ev) {
      const outs = await this.updates($ev.target.name, $ev.target.value);
      this.last_updated = Date.now();
      return outs;
    },
    clear(){
      if(window.confirm(`delete ${this.selection.join(', ')}?`)) {
        // this.selection.forEach((v)=>this.deletes(v));
        this.deletes(this.selection);
      }
    },
    typename_duplication() {
      const dupline = this.newtype_names.reduce((agg, ln, li)=>{
          return agg || (Datatype.name_exists(ln) ? {l:li+1, n:ln} : null);
      }, false);
      
      return dupline ? `typename ${dupline.l}: ${dupline.n}` : null;
    },
    create_newtype() {
      if(this.newtype_names.length<=0) {
        return null;
      }
      // create new datatypes
      this.create_new(...this.newtype_names.map((name)=>({name, ...this.newtype})));
      // then clear newtype data
      this.newtype = {
        names: '',
        basistype: 'object',
        is_primitive: false,
      }
    },
    // create_new() {
    //   if(this.can_save) {
    //     this.appends(this.newtype);
    //     // update selection
    //     this.selection = [Datatype.find(this.newtype.name)];
    //     // re-initialize newtype
    //     this.newtype = {
    //       name: '',
    //       basistype: 'object',
    //     };
    //   }
    // },
    ...mapActions(useDatatypeStore, [
      'updates',
      'update_items',
      'deletes',
      'appends',
      'create_new',
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
    newtype_names() {
      return this.has_select ? null :
        (this.newtype.names || '')
          .split('\n').map((ln)=>ln.trim())
          .filter((ln)=>ln!=null && 0<ln.length);
    },
    can_save() {
      return !this.has_select 
        && 0<this.newtype_names.length
        && this.typename_duplication()==null
        && this.newtype.basistype.length;
    },
    ...mapState(useDatatypeStore, [
      'keynames',
      
      'values',
      'alltypes',

      'has_select',
      'origins',
      'items',
    ]),
    ...mapWritableState(useDatatypeStore, [
      'selection',
      'datatypes',
    ]),
  },
  data() {
    return {
      last_updated: Date.now(),
      menus: [
        { id: 'create', title: 'create_new', callback: function(){ window.alert('new datatype'); }, },
        { id: 'inherit', title:'inherit_new', callback: function(){ window.alert('inherits datatype'); }, },
      ],
      newtype: {
        names: '',
        basistype: 'object',
        is_primitive: false,
      },
      // properties: datatype_properties,
    };
  }
}
</script>