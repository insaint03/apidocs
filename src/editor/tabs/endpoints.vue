<template>
  <v-data-table 
    density="compact"
    item-value="index"
    items-per-page="-1" hide-default-footer
    expand-on-click show-expand
    multi-sort
    :headers="columns"
    :items="values"
    >
    <template #thead>

    </template>
    <template #item.tags="{ item }">
      <v-chip v-for="(tag, i) in item.tagnames" :key="i" size="x-small" class="ma-1">
        {{ tag }}
      </v-chip>
    </template>
    <template #item.request.method="{ item }">
      <v-btn text flat size="x-small" readonly :color="$thx.color.http_method[item.request.method]" class="mx-1">
        {{ item.request.method }}
      </v-btn>
    </template>
    <template #item.request.pathname="{ item }">
      <span class="enpoint-pathname" readonly>
        {{ item.request.pathname }}
      </span>
    </template>
    <template #item.response="{ item }">
      <v-chip size="x-small" class="ma-1">{{ item.response.body.name }}</v-chip>
      {{ item.response.mimetype }}
      <v-btn text flat size="x-small" class="ma-1"
        :color="$thx.color.http_status(item.response.status_code)">{{ item.response.status_title }}</v-btn>
    </template>
    <template #expanded-row="{index, item, toggleSelect, columns}">
      <tr>
        <td :colspan="columns.length">
          <v-sheet theme="dark" class="my-2 pa-2 rounded">
            <v-row>
              <v-col>
                <v-autocomplete v-model="item.entity.template_names" label="templates" multiple chips :items="template_list" item-title="name" item-value="name" v-bind="$thx.field" />
                <markdown-field v-model="item.entity.desc" label="description" v-bind="$thx.field" />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-divider>Request</v-divider>
                <div class="d-flex flex-fill justify-space-around">
                  <v-autocomplete v-model="item.request.method" label="method" v-bind="$thx.field" :items="methods" />
                  <v-text-field v-model="item.request.pathname" class="flex-grow px-2" label="pathname" v-bind="$thx.field" />
                </div>
                <markdown-field v-model="item.request.desc" label="description" v-bind="$thx.field" />
                <v-textarea v-model="item.request.query_texts" label="query" v-bind="$thx.field" />
                <v-textarea v-model="item.request.cookie_texts" label="cookie" v-bind="$thx.field" />
                <v-textarea v-model="item.request.header_texts" label="header" v-bind="$thx.field" />
                <v-autocomplete 
                  :disabled="/^get$/i.test(item.request.method)"
                  v-model="item.request.body" label="request.body" :items="datatype_list" item-title="name" response-object v-bind="$thx.field" />
              </v-col>
              <v-col>
                <v-divider>Reponse</v-divider>
                <div class="d-flex flex-fill justify-space-around">
                  <v-autocomplete v-model="item.response.status" label="method" v-bind="$thx.field" :items="statuses"
                    item-title="title" item-subtitle="code" item-value="code" />
                  <v-text-field v-model="item.response.mimetype" class="flex-grow px-2" label="pathname" v-bind="$thx.field" />
                </div>
                <markdown-field v-model="item.response.desc" label="description" v-bind="$thx.field" />
                <v-textarea v-model="item.response.cookie_texts" label="cookie" v-bind="$thx.field" />
                <v-textarea v-model="item.response.header_texts" label="header" v-bind="$thx.field" />
                <v-autocomplete v-model="item.response.body" 
                  label="responses" :items="datatype_list" item-title="name" response-object v-bind="$thx.field" />
              </v-col>
            </v-row>
          </v-sheet>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>
<script>
import { mapActions, mapState, mapWritableState } from 'pinia';
import { useProjectStore } from '@/stores/project';

import markdownField from '@/components/markdownField.vue';
import Request from '@/models/request';
import Response from '@/models/response';

const columns = [
  { title: '#', key: 'index', },
  { title: 'tags', key: 'tags', value: (e)=>e.tagnames },
  { title: 'method', key: 'request.method', value:(e)=>e.request.method },
  { title: 'pathname', key: 'request.pathname', value:(e)=>e.request.pathname },
  { title: 'response', key: 'response', value:(e)=>e.response },
]

export default {
  name: 'endpointsTab',
  components: {
    markdownField,
  },
  methods: {
    ...mapActions(useProjectStore, [
      // 'addEndpoint',
      // 'removeEndpoint',
      // 'updateEndpoint',
    ]),
  },
  props: {
  },
  computed: {
    values() {
      return this.entities.map((e,i)=>({
        index: i+1,
        entity: e,
        request: e.request,
        response: e.response,
        // ...e,
      }))
    },
    tagnames() {
      return this.tags.map(t=>t.tagname);
    },
    statuses() {
      return Object.values(Response.statuses);
    },
    ...mapWritableState(useProjectStore, [
      'entities',
      'endpoints',
    ]),
    ...mapState(useProjectStore, [
      'datatype_list',
      'datatypes',
      'tags',
      'templates',
      'template_list',
    ]),
  },
  data() {
    return {
      columns,
      methods: Request.methods,
      mimetypes: Response.mimetypes,
      // statuses: Response.statuses,

    };
  }
}
</script>