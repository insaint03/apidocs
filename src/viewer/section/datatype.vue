<template>
  <card-section :prefix="`datatype/${datatype.name}`" 
    :items="items" :expand-defaults="expandings"
    :color="$thx.color.datatype">
    <template #card-title>
      <h2 class="tooltip" :href="`#/datatype/${datatype.name}/`">
        <v-btn flat icon readonly :title="`datatype/${datatype.name}`">
          <v-icon :color="$thx.color.datatype">{{ $thx.icon.datatype }}</v-icon>
        </v-btn> 
        {{ datatype.name }}
        &nbsp;
        <v-chip :color="$thx.color.datatype" size="small">{{ datatype.origintype }}</v-chip>
      </h2>
    </template>
    <!-- basic summary -->
    <div class="desc-summary">{{ datatype.summary }}</div>
    <!-- detail description -->
    <template #card-more-desc>
      <datatype-desc :datatype="datatype" />
    </template>
    <!-- items -->
    <template #card-more-items>
      <datatype-items :datatype="datatype" />
    </template>
    <template #card-more-examples>
      {{ datatype.examples}}
    </template>
  </card-section>
  <!-- TODO: migrate 
  <v-card>
    <v-toolbar density="compact">
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
        -- items --
        <v-col v-show="show.items">
          <view-items :datatype="datatype" />
        </v-col>
        -- details --
        <v-col v-show="show.details">
          <view-forms :model-value="datatype" :fields="fields.details" />
        </v-col>
        -- examples --
        <v-col v-show="show.examples">
          <view-forms :model-value="datatype" :fields="fields.examples" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
-->
</template>
<script>
import cardSection from './card.vue'
// import viewForms from '@/components/forms.vue';
// import viewItems from '@/components/items.vue';
import Datatype from '@/models/datatype';
import datatypeDesc from '@/viewer/components/datatypeDesc.vue';
import datatypeItems from '@/viewer/components/datatypeItems.vue';

const fields = {
  details: [
    { key: 'defaults', label: 'defaults' },
    { key: 'description', label: 'description', is: 'v-textarea' },
    { key: 'migration', label: 'migration'},
    { key: 'validation', label: 'validation'},
  ],
  examples: [
    { key: 'examples', label: 'examples'},
  ]
}
export default {
  name: 'datatypeView',
  components: {
    cardSection,
    datatypeDesc,
    datatypeItems,
    // viewForms,
    // viewItems,
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
      items: ['desc', 'items', 'examples'],
      expandings: {
        desc: true,
        items: true,
        examples: false,
      },
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