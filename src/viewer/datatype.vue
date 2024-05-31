<template>
  <v-card>
    <v-toolbar color="accent" dark density="compact">
      <v-toolbar-title>
        {{ datatype.name }}
        <v-chip>{{ datatype.basistype }}</v-chip>
        <!-- TODO: if migration presents -->
        <!-- TODO: if templates presents -->
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-row>
        <v-col cols="12" xl="4" lg="6" v-for="fs,fi in fields" :key="`dt-form.${fi}`">
          <view-forms :modelValue="datatype" :fields="fs" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import viewForms from './forms.vue';
const _items = {
  itemId: 'key',
  itemTitle: 'key',
  itemSubtitle: 'datatype',
  itemDesc: 'description',
};
const fields = [
  // 
  [
    { key: 'name', label: 'name'},
    { key: 'summary', label: 'summary' },
    // { key: 'items', label: 'items', is: 'view-items' },
  ], 
  [
    { key: 'migration', label: 'migration'},
    { key: 'desc', label: 'description', is: 'v-textarea' },
  ],
  [
    { key: 'basistype', label: 'basistype'},
    { key: 'origintype', label: 'origintype'},
    { key: 'defaults', label: 'defaults'},
    { key: 'examples', label: 'examples'},
    { key: 'validation', label: 'validation'},
  ]
]
export default {
  name: 'datatypeView',
  components: {
    viewForms,
  },
  props: {
    datatype: Object,
  },
  data() {
    return {
      fields,
    };
  }
}
</script>