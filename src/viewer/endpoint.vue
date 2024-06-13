<template>
  <v-card flat rounded="lg" :color="$thx.color.api">
    <v-toolbar :color="$thx.color.api" dark density="compact">
      <v-toolbar-title>
        <v-chip dark :color="$thx.color.http_method[endpoint.request.method]">{{ endpoint.request.method }}</v-chip>
         {{ endpoint.request.path }}
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn text @click="show.details = !show.details" :active="show.details">desc</v-btn>
        <v-btn text @click="show.message = !show.message" :active="show.message">api</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card-subtitle>{{ endpoint.summary }}</v-card-subtitle>
    <v-card-text>
      <v-row v-show="show.details">
        <v-col>
          <view-forms :modelValue="endpoint" :fields="fields.left" />
        </v-col>
      </v-row>
      <v-row v-show="show.message">
        <v-col>
          <view-forms :modelValue="endpoint" :fields="fields.request" />
        </v-col>
        <v-col>
          <view-forms :modelValue="endpoint" :fields="fields.response" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import viewForms from './forms.vue';
const fields={
  left: [
    { key: 'summary', label: 'summary' },
    { key: 'desc', label: 'description', is: 'v-textarea' },
    { key: 'tags', label: 'tags', is: 'v-textarea' },
  ],
  right: [

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
      show: {
        details: false,
        message: false,
      },
      fields,
    };
  }
}
</script>