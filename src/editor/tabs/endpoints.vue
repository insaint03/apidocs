<template>
  <tab-header :icon="$thx.icon.endpoint" :color="$thx.color.endpoint">
    <template #items>
      <v-btn text flat @click="show_mix=true" :color="$thx.color.primary">mix</v-btn>
      <v-divider vertical />
      <v-btn text flat @click="append">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
  </tab-header>
  <template-mix-dialog v-model="show_mix" />
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
      <v-chip-group>
        <v-chip v-for="(tag, i) in item.tagnames" :key="`endpoint-tags-${item.index}.${tag}.${i}`"
          class="endpoint-tags" size="x-small" readonly :color="$thx.color.tag" :prepend-icon="$thx.icon.tag">{{ tag }}</v-chip>
      </v-chip-group>
    </template>
    <template #item.request.method="{ item }">
      <v-btn text flat size="x-small" readonly :color="$thx.color.http_method[item.entity.request.method]" class="mx-1">
        {{ item.entity.request_method }}
      </v-btn>
    </template>
    <template #item.request.pathname="{ item }">
      <span class="enpoint-pathname" readonly>
        {{ item.entity.request.pathname }}
      </span>
    </template>
    <template #item.response="{ item }">
      <v-btn text flat size="x-small" class="ma-1" readonly
        :color="$thx.color.http_status(item.entity.response_status)">{{ item.entity.response.status_title }}</v-btn>
      {{ item.entity.response_mimetype }}
      <v-chip size="x-small" class="ma-1">{{ item.entity.response_body || '' }}</v-chip>
      <v-divider vertical />
    </template>
    <template #expanded-row="{item, columns, isExpanded}">
      <tr>
        <td :colspan="columns.length">
          <edit-entity :index="item.index" v-if="isExpanded" />
        </td>
      </tr>
    </template>
  </v-data-table>
  <v-divider />
  <v-form>

  </v-form>
</template>
<script>
import { mapActions, mapState, mapWritableState } from 'pinia';
import { useProjectStore } from '@/stores/project';

import tabHeader from '../components/tabHeader.vue';

import templateMixDialog from '../components/templateMixDialog.vue';

import editEntity from '../components/editEntity.vue';
import Entity from '@/models/entity';

// import Request from '@/models/request';
import Response from '@/models/response';

const columns = [
  { title: '#', key: 'index', },
  { title: 'tags', key: 'tags', value: (e)=>e.tagnames },
  { title: 'summary', key: 'summary', value:(e)=>e.summary },
  { title: 'method', key: 'request.method', value:(e)=>e.request_method },
  { title: 'pathname', key: 'request.pathname', value:(e)=>e.request_pathname },
  { title: 'response', key: 'response', value:(e)=>e.response },
]

export default {
  name: 'endpointsTab',
  components: {
    tabHeader,
    // markdownField,
    templateMixDialog,
    // messageItemsField,
    editEntity,
  },
  methods: {
    append() {
      this.entities = this.entities.concat([Entity.setup({
        description: 'new endpoint',
        request: {},
        response: {},
      })]);
    },
    subtract(index) {
      this.entities.splice(index,1);
    },
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
        index: i,
        entity: e,
        summary: e.summary,
        tagnames: e.tagnames,
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


      show_mix: false,
      // statuses: Response.statuses,

    };
  }
}
</script>
<style scoped>
table thead th {
  text-align: center;
}
table tbody td {
  vertical-align: top;
}
</style>