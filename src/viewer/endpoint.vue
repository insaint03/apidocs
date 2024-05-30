<template>
  <v-card elevation="0">
    <v-toolbar color="primary" dark density="compact">
      <v-toolbar-title>
        {{ endpoint.request.method }} {{ endpoint.request.path }}
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-row>
        <v-col>
          <view-forms :modelValue="endpoint" :fields="fields.common" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <view-forms :modelValue="endpoint" :fields="fields.request" />
        </v-col>
        <v-col cols="6">
          <view-forms :modelValue="endpoint" :fields="fields.response" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import viewForms from './forms.vue';
const fields={
  common: [
    { key: 'summary', label: 'summary' },
    { key: 'desc', label: 'description', is: 'v-textarea' },
    { key: 'tags', label: 'tags', is: 'v-textarea' },
  ],
  request: [
    { key: 'path', label: 'path' },
    { key: 'method', label: 'method' },
    { key: 'queries', label: 'queries', is: 'v-textarea' },
    { key: 'headers', label: 'headers', is: 'v-textarea' },
    { key: 'cookies', label: 'cookies', is: 'v-textarea' },
    { key: 'body', label: 'body', is: 'v-textarea' },
  ],
  response: [
    { key: 'status', label: 'status' },
    { key: 'headers', label: 'headers', is: 'v-textarea' },
    { key: 'cookies', label: 'cookies', is: 'v-textarea' },
    { key: 'body', label: 'body', is: 'v-textarea' },
  ],

}

export default {
  name: 'endpointView',
  components: {
    viewForms,
  },
  props: {
    endpoint: Object,
  },
  data() {
    return {
      fields,
    };
  }
}
</script>