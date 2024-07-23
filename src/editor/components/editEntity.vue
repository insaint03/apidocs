<template>
  <v-sheet theme="dark" class="ma-1 pa-1 rounded">
    <div class="d-flex justify-between align-center">
      <v-autocomplete v-model="entity.template_names" 
        label="templates" multiple clearable auto-select-first
        :items="template_list"
        item-title="name" item-value="name" v-bind="$thx.field" />
      <v-divider vertical />
      <v-btn text flat @click="deletes(index)">
        delete
      </v-btn>
    </div>
    <v-row>
      <v-col>
        <markdown-field v-model="entity.description" label="description" v-bind="$thx.field" />
      </v-col>
    </v-row>
    <v-table>
      <thead>
        <tr>
          <td>&nbsp;</td>
          <th style="text-align: center;">
            <v-icon size="small">mdi-airplane-takeoff</v-icon>
            Request
          </th>
          <th style="text-align: center;">
            Response
            <v-icon size="small">mdi-airplane-landing</v-icon>
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- connection base row -->
        <tr>
          <th><v-icon title="connect definition">mdi-connection</v-icon></th>
          <td>
            <markdown-field v-model="entity.request_desc" label="description" v-bind="$thx.field" />
            <v-row>
              <v-col>
                <v-autocomplete v-model="entity.request_method" label="method" v-bind="$thx.field" :items="methods" clearable />
              </v-col>
              <v-col>
                <v-text-field class="flex-grow px-2" label="path" v-bind="$thx.field"
                  v-model="entity.request_pathname" />
              </v-col>
            </v-row>
            <message-items-field label="query"
              v-model="entity.request_queries" />
          </td>
          <td>
            <markdown-field v-model="entity.response_desc" label="description" v-bind="$thx.field" />
            <v-row>
              <v-col>
                <v-autocomplete v-model="entity.response_status" label="status" v-bind="$thx.field" :items="statuses"
                  item-title="title" item-subtitle="code" item-value="code" />
              </v-col>
              <v-col>
                <v-autocomplete v-model="entity.response_mimetype" class="flex-grow px-2" label="mimetype" v-bind="$thx.field" :items="mimetypes" />
              </v-col>
            </v-row>
          </td>
        </tr>
        <tr>
          <th><v-icon title="headers/cookies">mdi-dock-top</v-icon></th>
          <td>
            <message-items-field v-model="entity.request_headers" label="header" />
            <message-items-field v-model="entity.request_cookies" label="cookie" />
          </td>
          <td>
            <message-items-field v-model="entity.response_headers" label="header" />
            <message-items-field v-model="entity.response_cookies" label="cookie" />
          </td>
        </tr>
        <tr>
          <th><v-icon title="body">mdi-dock-bottom</v-icon></th>
          <td>
            <v-autocomplete 
              v-model="entity.request_body"
              :disabled="/^get$/i.test(entity.request.method)"
              label="request.body" :items="datatype_all" item-title="name" item-value="name" v-bind="$thx.field" />
          </td>
          <td>
            <v-autocomplete 
              v-model="entity.response_body"
              label="responses" :items="datatype_all" item-title="name" item-value="name" v-bind="$thx.field" />
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-sheet>
</template>
<script>
import { mapState, mapWritableState } from 'pinia';
import { useProjectStore } from '@/stores/project';
import { useEndpointStore } from '@/stores/endpoint';
// import fields from '@/fields';

import messageItemsField from '../components/messageItemsField.vue';
import markdownField from '@/components/markdownField.vue';
// import baseForm from '@/components/forms/baseForm.vue';
// import ObjectItems from '@/models/meta/objectItems'
// import Request from '@/models/request';
// import Response from '@/models/response';

// const tableHeaders = [
//   'request',
//   'response',
// ]

export default {
  name: 'editEntity',
  components: {
    markdownField,
    messageItemsField,
  },
  methods: {
    deletes(index) {
      if(confirm(`delete #${index} ${this.entity.summary}?`)) {
        // splice
        this.entities.splice(index, 1);
      }
    },
    test_update(v) {
      console.log('update', v);
      this.entity.request.query_items = v;
    }
  },
  props: {
    index: {
      type: Number,
      required: true,
    }
  },
  computed: {
    entity() {
      return this.entities[this.index];
    },
    ...mapState(useEndpointStore, [
      // 'parameters',
      // 'entities',
      'methods',
      'mimetypes',
      'statuses',
      'datatype_all',
      'template_list',
    ]),
    ...mapWritableState(useProjectStore, [
      'entities',
    ]),
  },
  data() {
    return {
    }
  }
}
</script>