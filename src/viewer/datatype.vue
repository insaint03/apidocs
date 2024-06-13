<template>
  <v-card :color="$thx.color.datatype">
    <v-toolbar density="compact" :color="$thx.color.datatype">
      <v-card-title>{{ datatype.name }}</v-card-title>
      <v-breadcrumbs :items="datatype.inherits" />
      <v-spacer />
      <v-toolbar-items>
        <v-btn text :active="show.items" @click="show.items = !show.items">items</v-btn>
        <v-btn text :active="show.details" @click="show.details = !show.details">details</v-btn>
        <v-btn text :active="show.examples" @click="show.examples = !show.examples">examples</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card-subtitle>{{ datatype.summary }}</v-card-subtitle>
    <v-card-text>
      <v-row>
        <!-- items -->
        <v-col cols="12" xl="4" lg="6" v-show="show.items">
          <view-items :model-value="datatype.name" />
        </v-col>
        <!-- details -->
        <v-col cols="12" xl="4" lg="6" v-show="show.details">
          <view-forms :model-value="datatype" :fields="fields.details" />
        </v-col>
        <!-- examples -->
        <v-col cols="12" xl="4" lg="6" v-show="show.examples">
          <view-forms :model-value="datatype" :fields="fields.examples" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import viewForms from './forms.vue';
import viewItems from './items.vue';
import Datatype from '@/models/datatype';

const fields = {
  details: [
    { key: 'migration', label: 'migration'},
    { key: 'defaults', label: 'defaults', is: 'v-textarea' },
    { key: 'description', label: 'description', is: 'v-textarea' },
    { key: 'validation', label: 'validation'},
  ],
  examples: [
    { key: 'examples', label: 'examples'},
  ]
}
export default {
  name: 'datatypeView',
  components: {
    viewForms,
    viewItems,
  },
  methods: {
    // toggle show_details
    toggle_details() {
      this.show_details = !this.show_details;
    },
    // toggle show_examples
    toggle_examples() {
      this.show_examples = !this.show_examples;
    },
  },
  props: {
    datatype: Datatype,
  },
  computed: {
  },
  data() {
    return {
      fields,
      show: {
        items: true,
        details: false,
        examples: false,
      },
      // show_details: false,
      // show_examples: false,
    };
  }
}
</script>