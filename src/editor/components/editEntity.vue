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
            <markdown-field v-model="entity.request.description" label="description" v-bind="$thx.field" />
            <v-row>
              <v-col>
                <v-autocomplete v-model="entity.request.method" label="method" v-bind="$thx.field" :items="methods" clearable />
              </v-col>
              <v-col>
                <v-text-field v-model="entity.request.pathname" class="flex-grow px-2" label="pathname" v-bind="$thx.field" />
              </v-col>
            </v-row>
            <message-items-field v-model="entity.request.query_items" label="query" />
          </td>
          <td>
            <markdown-field v-model="entity.response.description" label="description" v-bind="$thx.field" />
            <v-row>
              <v-col>
                <v-autocomplete v-model="entity.response.status" label="status" v-bind="$thx.field" :items="statuses"
                  item-title="title" item-subtitle="code" item-value="code" />
              </v-col>
              <v-col>
                <v-autocomplete v-model="entity.response.mimetype" class="flex-grow px-2" label="mimetype" v-bind="$thx.field" :items="mimetypes" />
              </v-col>
            </v-row>
          </td>
        </tr>
        <tr>
          <th><v-icon title="headers/cookies">mdi-dock-top</v-icon></th>
          <td>
            <message-items-field v-model="entity.request.header_items" label="header" />
            <message-items-field v-model="entity.request.cookie_items" label="cookie" />
          </td>
          <td>
            <message-items-field v-model="entity.response.header_items" label="header" />
            <message-items-field v-model="entity.response.cookie_items" label="cookie" />
          </td>
        </tr>
        <tr>
          <th><v-icon title="body">mdi-dock-bottom</v-icon></th>
          <td>
            <v-autocomplete 
              :model-value="request.bodytype"
              :disabled="/^get$/i.test(request.method)"
              @update:model-value="(v)=>entity.request.body = v"
              label="request.body" :items="datatype_all" item-title="name" item-value="name" v-bind="$thx.field" />
          </td>
          <td>
            <v-autocomplete 
              :model-value="response.bodytype"
              @update:model-value="(v)=>entity.response.body = v"
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
import ObjectItems from '@/models/meta/objectItems'
// import Request from '@/models/request';
// import Response from '@/models/response';

const tableHeaders = [
  'request',
  'response',
]

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
    request() {
      return this.entity.request;
    },
    response() {
      return this.entity.response;
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