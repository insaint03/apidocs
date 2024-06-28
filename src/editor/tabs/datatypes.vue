<template>
  <v-card flat>
    <v-toolbar flat>
      <v-toolbar-title>
        {{ title }}
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>

        <v-menu>
          <template #activator="{ props }">
            
            <v-btn text v-bind="{...props,...$thx.btn}" :disabled="!has_select" style="text-transform: none;">
              {{ datatype.basistype }}
              <v-icon>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list slim lines="one" 
            :color="$thx.color.datatype"
            :selected="[datatype.basistype]" selectable
            :items="datatype_items" 
            :disabled="!has_select" />
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-row>
          <v-col cols="3">
            <v-text-field v-model="datatype.name" label="name" v-bind="$thx.field" />
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="datatype.basistype" label="basistype" v-bind="$thx.field" />
          </v-col>
          <v-col cols="3">
            <v-checkbox disabled v-model="datatype.is_primitive" label="is_primitive" v-bind="$thx.field" />
          </v-col>
          <v-col cols="3">
            <v-text-field :disabled="datatype.origintype!='object'" v-model="datatype.migration" label="migration" v-bind="$thx.field" />
          </v-col>
        </v-row>
        
        <markdown-field v-model="datatype.description" :datatype="datatype" label="description" v-bind="$thx.field" />
        <items-field v-if="datatype.items" 
          v-model="datatype.items" :datatype="datatype" label="items" v-bind="$thx.field" />
        <v-divider>details</v-divider>
        
        <v-text-field disabled v-model="datatype.defaults" label="defaults" v-bind="$thx.field" />
        <v-text-field disabled v-model="datatype.validation" label="validation" v-bind="$thx.field" />
        <v-text-field disabled label="examples" v-bind="$thx.field" /> <!-- TODO: examples -->
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script>
import Datatype from '@/models/datatype';
import markdownField from '@/components/markdownField.vue';
import itemsField from '../components/itemsField.vue';

const datatype_properties = [
  'name',
  'basistype',
  'origintype',
  'description',
  'items',
  'migration',
  'defaults',
  'validation',
  'examples',
];

export default {
  name: 'datatypeEditor',
  components: {
    markdownField,
    itemsField,
  },
  methods: {
    updates(ev, key) {
      this.selected_types.forEach((name)=>{
        // setup
        Datatype.find(name)[key] = value;
      });
    }
  },
  props: {
    datatypes: Object,
    selected_types: Array,
    // datatype: Object,
  },
  computed: {
    has_select() {
      return 0<this.selected_types.length;
    },
    title() {
      const threshold = 3;
      const names = this.selected_types.slice(0,threshold).join(', ');
      const suffix = this.selected_types.length>3 
        ? `... & ${this.selected_types.length-threshold} others` 
        : '';
      return `${names}${suffix}`;
    },
    singular() {
      return this.selected_types.length===1;
    },
    datatype() {
      const init = Object.fromEntries(
        datatype_properties.map((p)=>[p,undefined]));
      
      return this.selected_types.reduce((agg,name)=>{
        const the_type = this.datatypes[name];
        datatype_properties.forEach((pn)=>{
          const current = agg[pn];
          const compare = the_type[pn];

          if(current===undefined) {
            agg[pn] = compare;
          } else if(current!==compare) {
            agg[pn] = null;
          }
        });
        return agg;
      }, init);
    },
    type_inheritance() {
      return this.datatype.basistype
        ? Datatype.find(this.datatype.basistype).inherits
        : [];
    },
    datatype_items() {
      // console.log('origins', Datatype.origins)
      return Datatype.origins
        .map((d)=>({
          title: d.name,
          value: `origin-${d.name}`,
          children: Datatype.inheriteds(d)
            // custom type first
            .sort((l,r)=>!l.is_primitive && r.is_primitive ? -1 : 1)
            .map((ch)=>ch.name),
        }));
    },
  },
  data() {
    return {
      properties: datatype_properties,
    };
  }
}
</script>