<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            {{ value.name || 'unset' }}
          </v-card-title>
          <v-card-subtitle>{{ value.type || 'unset' }}</v-card-subtitle>
          <v-card-text>
            <v-list>
              <v-list-item v-for="(f, fi) in fields" :key="`field-${f.key}.${fi}`">
                <v-list-item-title>{{ value[f.key] || '-' }}</v-list-item-title>
                <v-list-item-subtitle>{{ f.key }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="dialog = true">Open Dialog</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <editor-dialog v-model="value" :fields="fields" v-model:open="dialog" />
  </v-container>
</template>
<script>
import editorDialog from '@/components/editorDialog.vue';
import Datatype from '@/models/datatype.js';

export default {
  name: 'homeView',
  components: {
    editorDialog,
  },
  data() {
    return {
      value: {},
      dialog: false,
      fields: [
        { key: 'name', label: 'Name', required: true },
        { key: 'summary', label: 'Summary', required: false },
        { key: 'description', label: 'Description', required: false },
        { key: 'type', label: 'Type', is: 'datatype-picker', items: Datatype.all, itemTitle: 'name', itemValue: 'name' },
      ],
    }
  }
}
</script>@/models/parameter.js