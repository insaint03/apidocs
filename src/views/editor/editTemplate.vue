<template>
  <v-card>
    <v-toolbar>
      <v-toolbar-title>{{ this.value.name || '_new_template' }}</v-toolbar-title>
    </v-toolbar>
    
<!-- common setup -->
    <v-row>
      <v-col>
        <base-form v-model="value" :fields="fields.common" />
      </v-col>
      <v-col>
        <v-textarea v-model="value.description" />
      </v-col>
    </v-row>
    <!-- request -->
    <v-row>
      <v-col>
        <base-form v-model="value" :fields="fields.request" />
      </v-col>
      <v-col>
        <v-textarea v-model="value.request.description" />
      </v-col>
    </v-row>
    <!-- response -->
    <v-row>
      <v-col>
        <base-form v-model="value" :fields="fields.response" />
      </v-col>
      <v-col>
        <v-textarea v-model="value.response.description" />
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import Template from '@/models/template';
import fields from '@/fields'

export default {
  name: 'editTemplate',
  props: {
    modelValue: {
      type: Template,
      required: true,
    }
  },
  data() {
    return {
      value: this.modelValue,
      fields: {
        common: fields.templates,
        request: fields.request,
        response: fields.response,
      },

    }
  }
}
</script>