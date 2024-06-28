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
        <template v-for="p,pi in properties" :key="`datatype-edit.property-${p.key}.${pi}`">
          <component :is="p.field || 'v-text-field'"
            :disabled="!has_select"
            :datatype="datatype"
            :model-value="datatype[p.key]"
            :label="p.label || p.key"
            :rules="p.rules"
            v-bind="$thx.field"
            
           />

        </template>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script>
import Datatype from '@/models/datatype';
import markdownField from '@/components/markdownField.vue';
import itemsField from '../components/itemsField.vue';

const datatype_properties = [
  {key: 'name', },
  {key: 'description', field: 'markdown-field',},
  {key: 'validation',},
  {key: 'defaults',},
  {key: 'migration',},
  {key: 'items', field: 'items-field',},
  {key: 'examples',},
];
const none_field_properties = [
  'basistype','origintype',
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
      const attrs = datatype_properties.map((p)=>p.key)
        .concat(none_field_properties)
        .filter((v,i,a)=>a.indexOf(v)===i);
      const init = Object.fromEntries(
        attrs.map((p)=>[p,undefined]));
      
      return this.selected_types.reduce((agg,name)=>{
        const the_type = this.datatypes[name];
        attrs.forEach((pn)=>{
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