<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card>
          <v-toolbar flat>
            <v-toolbar-title>
              {{ value.name || '_new_parameter' }}
              <v-chip>{{ value.basistype || 'unselected' }}</v-chip>
            </v-toolbar-title>
            <v-spacer />
            <v-toolbar-items>
              <v-btn icon @click="$emit('save', value)">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <base-form v-model="value" :fields="fields" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Parameter from '@/models/parameter';
import fields from '@/fields';

import baseForm from '@/components/forms/baseForm.vue';

export default {
  name: 'editDatatype',
  components: {
    baseForm,
  },
  props: {
    modelValue: {
      type: Parameter,
      required: true,
    }
  },
  data() {
    return {
      value: this.modelValue,
      fields: fields.parameters,
    }
  }
}
</script>