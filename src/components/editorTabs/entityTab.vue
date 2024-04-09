<template>
  <v-row class="ma-0 pa-1" align-content="stretch">
    <!-- left list of entries -->
    <v-col cols="4">
      <v-list>
        <v-list-item>
          <v-btn text color="primary" @click="add_new"><v-icon>mdi-plus</v-icon> New Entity</v-btn>
        </v-list-item>
        <v-divider />
        <v-list-item v-for="entity, ei in entities" :key="`entity-${ei}`"
          :title="`[${entity.request.method}] ${entity.request.path}`" 
          :subtitle="`${entity.response.mimetype} (${entity.response.status})`"
          @click="select(entity)">
        </v-list-item>
      </v-list>
    </v-col>
    <!-- right editor area -->
    <v-col cols="8">
      <v-expansion-panels multiple>
        <!-- tmpl combinations -->
        <v-expansion-panel title="templates">
          <template #text>
            <v-autocomplete v-model="expended" :items="templates" item-text="name" item-value="name" label="templates"
              multiple />

          </template>
        </v-expansion-panel>
        <!-- request selection -->
        <v-expansion-panel title="request">
          <template #text>
            <base-form v-model="item.request" :fields="request_fields" />
          </template>
        </v-expansion-panel>
        <!-- response selection -->
        <v-expansion-panel title="response">
          <template #text>
            <base-form v-model="item.response" :fields="response_fields" />
          </template>
        </v-expansion-panel>

      </v-expansion-panels>

    </v-col>

  </v-row>
</template>
<script>
import { mapWritableState } from 'pinia';
import { useServiceStore } from '@/stores/service';
import { useEditorStore } from '@/stores/editor';


import fields from '@/fields';
import baseForm from '@/components/forms/baseForm.vue';
// import parameterPicker from '@/components/inputFields/parameterPicker.vue';

const title = 'entities';

export default {
  name: 'entityTab',
  components: {
    baseForm,
  },
  methods: {
    select(d) {
      this.the_entity = d;
    },
    add_new() {
      this.entities.push({
        request: {
          method: 'GET',
          path: '/',
        },
        response: {
          status: 200,
          mimetype: 'text/plain',
        },
      });
      
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
          title: 'response', value: 'response',
          children: [
            { title: 'status', value: 'status' },
            { title: 'mimetype', value: 'mimetype' },
          ],
        }
      ]
    },
    item: {
      get() { return this.entities[this.on_entity] || {}; },
      set(v) { this.on_entity = this.entities.indexOf(v); },
    },
    ...mapWritableState(useServiceStore, ['entities', 'templates']),
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