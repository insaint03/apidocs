<template>
  <v-col :cols="cols">
    <v-sheet elevation="3" clas="d-flex flex-fill" @click="focusing = title">
      <v-data-table :key="`entity-list.${last_updated}`" :items="entities" :headers="headers" :items-per-page="-1"
        single-select :group-by="['request.path']" show-expand :expended="expended" :search="search">
        <!-- top area; filter/search -->
        <template #top>
          <v-toolbar density="compact">
            <v-toolbar-items>
              <!-- add new button -->
              <v-btn icon @click="add_new">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
              <!-- filter by path -->
              <v-text-field v-model="search" label="search" />
              <!-- filter by tag -->
              <v-autocomplete v-model="tag" label="tag" />
              <!-- filter by param-->
              <parameter-picker v-model="param" label="parameter" />
            </v-toolbar-items>
          </v-toolbar>
        </template>

        <!-- group header -->
        <template #group-header="{ item, columns }">
          <tr>
            <td :colspan="columns.length">
              {{ item.request.path }}
            </td>
          </tr>
        </template>

        <!-- row in defaults -->

        <!-- expanding form -->
        <template #expanded-row="{ item, isSelected, toggleSelect, columns }">
          <tr>
            <td :colspan="columns.length">
              <v-container class="d-flex">
                <!-- request form -->
                <v-card>
                  <v-card-title>Request</v-card-title>
                  <base-form v-model="item.request" :fields="request_fields" />
                </v-card>
                <v-card>
                  <v-card-title>Response</v-card-title>
                  <base-form v-model="item.response" :fields="response_fields" />
                </v-card>
              </v-container>
            </td>
          </tr>
        </template>

        <!-- footer area -->
        <template #bottom>

        </template>
      </v-data-table>
    </v-sheet>
  </v-col>
</template>
<script>
import { mapWritableState } from 'pinia';
import { useServiceStore } from '@/stores/service';
import { useEditorStore } from '@/stores/editor';

import fields from '@/fields';

import baseForm from '@/components/forms/baseForm.vue';
import parameterPicker from '@/components/inputFields/parameterPicker.vue';

const title = 'entities';

export default {
  name: 'entityTab',
  components: {
    baseForm,
    parameterPicker,
  },
  methods: {
    select(d) {
      this.the_entity = d;
    },
    add_new() {
      this.entities.push({
        request: {},
        response: {},
      });
      // this.dialog = true;
      // let item = Entity.create('entity', 'string');
      // this.entities.push(item);
      // this.select(item);
    },
    remove() {
      this.entities = this.entities.filter(dt => dt != this.the_entity);
      // this.the_entity = null;
    }
  },
  computed: {
    activated() {
      return this.focusing === title;
    },
    cols() {
      return this.activated ? 8 : 2;
    },
    headers() {
      return [
        { 
          title: 'request', value: 'request',
          children: [
            { title: 'method', value: 'method' },
            { title: 'path', value: 'path' },
          ],
        },
        {
          title: 'response', value:'response',
          children: [
            { title: 'status', value: 'status' },
            { title: 'mimetype', value: 'mimetype' },
          ],
        }
      ]
    },
    the_entity: {
      get() { return this.entities[this.on_entity]; },
      set(v) { this.on_entity = this.entities.indexOf(v); },
    },
    ...mapWritableState(useServiceStore, ['entities']),
    ...mapWritableState(useEditorStore, ['focusing', 'on_entity']),
  },
  data() {
    return {
      title,
      search: null,
      param: null,
      tag: null,
      expended: [],

      request_fields: fields.request,
      response_fields: fields.response,
      last_updated: Date.now(),
    };
  },
}
</script>