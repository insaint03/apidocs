<template>
  <v-table theme="dark">
    <thead>
      <tr>
        <td>&nbsp;</td>
        <th>Request</th>
        <th>Response</th>
      </tr>
    </thead>
    <tbody>
      <!-- base settings -->
      <tr>
        <th><v-icon title="connect definition">mdi-connection</v-icon></th>
        <td>
          <v-select :model-value="modelValue.request.method" :items="request_methods"
            name="method" label="http method" v-bind="$thx.field" />
          <v-text-field :model-value="modelValue.request.path"
            name="path" label="path" v-bind="$thx.field" />
          <v-textarea :model-value="modelValue.request.query_text"
            name="queries" label="queries" v-bind="$thx.field" />
        </td>
        <td>
          <v-select :model-value="modelValue.response.status" :items="response_status"
            label="status" v-bind="$thx.field" />
          <v-text-field :model-value="modelValue.response.mimetype"
            label="mimetype" v-bind="$thx.field" />
        </td>
      </tr>
      <tr>
        <th><v-icon title="headers/cookies">mdi-dock-top</v-icon></th>
        <td>
          <v-textarea :model-value="modelValue.request.header_text"
            name="headers" label="header" v-bind="$thx.field" />
          <v-textarea :model-value="modelValue.request.cookie_text"
            name="cookies" label="cookie" v-bind="$thx.field" />
        </td>
        <td>
          <v-textarea :model-value="modelValue.response.header_text"
            name="headers" label="header" v-bind="$thx.field" />
          <v-textarea :model-value="modelValue.response.cookie_text"
            name="cookies" label="cookie" v-bind="$thx.field" />
        </td>
      </tr>
      <tr>
        <th><v-icon title="body">mdi-dock-bottom</v-icon></th>
        <td>
          <v-textarea :model-value="modelValue.request_body"
            name="request_body" label="body" v-bind="$thx.field" />
        </td>
        <td>
          <v-textarea :model-value="modelValue.response_body"
            name="response_body" label="body" v-bind="$thx.field" />
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
<script>
import Request from '@/models/request';
import Response from '@/models/response';

export default {
  name: 'messageEditor',
  props: {
    modelValue: Object,
    modeTemplate: Boolean,
  },
  data() {
    return {
      request_methods: Request.methods,
      response_status: Response.status,
    }
  }
}
</script>