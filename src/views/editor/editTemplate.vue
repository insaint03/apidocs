<template>
  <v-card>
    <v-toolbar density="compact">
      <v-toolbar-title>{{ value.name || '_new_template' }}</v-toolbar-title>
    </v-toolbar>
    <v-container fluid>

      <v-expansion-panels multiple variant="inset" v-model="panels">
        <!-- common setup -->
        <v-expansion-panel title="template" class="active" value="common">
          <v-expansion-panel-text>
            <v-row>
              <v-col>
                <base-form v-model="value" :fields="fields.template" />

              </v-col>
              <v-col>
                <desc-text v-model="value.description" />

              </v-col>
            </v-row>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <!-- request -->
        <v-expansion-panel title="request" value="request">
          <v-expansion-panel-text>
            <v-row>
              <v-col>
                <base-form v-model="value" :fields="fields.request" />
              </v-col>
              <v-col>
                <desc-text v-model="value.request.description" />
              </v-col>
            </v-row>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <!-- response -->
        <v-expansion-panel title="response" value="response">
          <v-expansion-panel-text>
            <v-row>
              <v-col>
                <base-form v-model="value" :fields="fields.response" />
              </v-col>
              <v-col>
                <desc-text v-model="value.response.description" />
              </v-col>
            </v-row>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </v-card>
</template>
<script>
import Template from '@/models/template';
import fields from '@/fields'

import baseForm from '@/components/forms/baseForm.vue';
import descText from '@/components/inputFields/descText.vue';
// import tableValues from '@/components/inputFields/tableValues.vue';

export default {
  name: 'editTemplate',
  components: {
    baseForm,
    descText,
    // tableValues,
  },
  props: {
    modelValue: {
      type: Template,
      required: true,
    }
  },
  data() {
    return {
      value: this.modelValue,
      fields: fields,
      panels: ['common'],
    }
  }
}
</script>