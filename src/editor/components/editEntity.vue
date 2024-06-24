<template>
  <v-expansion-panels variant="popout" multiple>
    <!-- entity input form -->
    <v-expansion-panel title="Form">
      <v-expansion-panel-text>
        <v-row>
          <v-col>
            <!-- TODO: template selector -->
            <v-select multiple :items="templates" />
            <v-textarea v-model="value.description" />
          </v-col>
          <v-col>
            <base-form v-model="value" :fields="fields.entity" />
          </v-col>
        </v-row>
      </v-expansion-panel-text>
    </v-expansion-panel>
    <!-- endpoint grouping area -->
    <v-expansion-panel title="Endpoints">
      <v-expansion-panel-text>
        <v-data-table />
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
import { mapWritableState } from 'pinia';
import { useProjectStore } from '@/stores/project';
import fields from '@/fields';

import baseForm from '@/components/forms/baseForm.vue';

const tableHeaders = [
  'request',
  'response',
]

export default {
  name: 'editEntity',
  components: {
    baseForm,
  },
  props: {
    modelValue: {
      // type: Array,
      required: true,
    }
  },
  computed: {
    ...mapWritableState(useProjectStore, [
      'parameters',
      'entities',
      'templates'
    ]),
  },
  data() {
    return {
      fields,
      value: this.modelValue,
      tableBind: {
        headers: tableHeaders,
      }
    }
  }
}
</script>