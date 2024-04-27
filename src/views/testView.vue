<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-items>
            <v-card-title> {{ value.name || 'unset' }}</v-card-title>
            <v-card-subtitle>{{ value.type || 'unset' }}</v-card-subtitle>
          </v-card-items>
          <v-card-text>
            <list-selector v-model="value" :fields="fields" v-model:items="items"
              item-new="new item" item-title="name" item-subtitle="type" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import listSelector from '@/components/listSelector.vue';

export default {
  name: 'homeView',
  components: {
    // editorDialog,
    listSelector,
  },
  data() {
    return {
      value: {},
      items: [
        {name: 'item1', type: 'type1', description: 'description1'},
        {name: 'item2', type: 'type2', description: 'description2'},
        {name: 'item3', type: 'type3', description: 'description3'},
      ],
      fields: [
        {key: 'name'},
        {key: 'type'},
        {key: 'description', is: 'v-textarea'},
      ]

    }
  }
}
</script>