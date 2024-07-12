<template>
  <tab-header :icon="$thx.icon.tag" :color="$thx.color.tag">
    <template #title>
      {{ tmpl.name || 'New Template' }}
      &nbsp;
      <v-chip v-if="tmpl.tagname" :color="$thx.color.tag" size="small">{{ tmpl.tagname }}</v-chip>
    </template>
    <template #items>
      <template v-if="has_selection">
        <v-btn text flat v-bind="$thx.btn" :color="$thx.color.danger" @click="clear">
          delete
        </v-btn>
      </template>
      <template v-else>
        <v-btn flat v-bind="$thx.btn" :color="$thx.color.tag">
          save
        </v-btn>
      </template>
    </template>
  </tab-header>
  <v-card flat>
    <v-card-item>
      <v-card-subtitle v-if="tmpl.extends">
        / {{ tmpl.extends }}
      </v-card-subtitle>
    </v-card-item>
    <v-card-text>
      <v-form>
        <!-- common setup -->
        <v-row>
          <v-col>
            <v-text-field v-model="tmpl.name" label="name" v-bind="$thx.field" :disabled="has_selection" />
          </v-col>
          <v-col>
            <v-autocomplete v-model="tmpl.extends" label="extends" v-bind="$thx.field"
              prepend-inner-icon="mdi-slash-forward"
              :items="all" item-title="name" item-value="name" />
          </v-col>
        </v-row>
        <v-text-field v-model="tmpl.tagname" label="tagname" 
          :prepend-inner-icon="$thx.icon.tag" v-bind="$thx.field" />
        <markdown-field v-model="tmpl.description" label="description" v-bind="$thx.field" />
        <v-autocomplete v-model="tmpl.datatypes" 
          label="datatypes"
          multiple chips :items="datatypes"
          v-bind="$thx.field" />
        <!-- request/response options -->
        <v-table theme="dark" v-show="has_selection">
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
          <!-- base settings -->
          <tbody>
            <tr>
              <th><v-icon title="connect definition">mdi-connection</v-icon></th>
              <td>
                <v-row>
                  <v-col>
                    <v-autocomplete v-model="tmpl.request.method" :items="request_methods"
                      clearable
                      name="method" label="http method" v-bind="$thx.field" />
                  </v-col>
                  <v-col>
                    <v-text-field v-model="tmpl.request.path"
                      name="path" label="path" v-bind="$thx.field" />
                  </v-col>
                </v-row>
                <message-items-field v-model="tmpl.request.queries" label="queries" />
              </td>
              <td>
                <v-row>
                  <v-col>
                    <v-autocomplete v-model="tmpl.response.status" :items="response_status"
                      clearable
                      label="status" placeholder="default: OK (200)"
                      v-bind="$thx.field" />
                  </v-col>
                  <v-col>
                    <v-text-field v-model="tmpl.response.mimetype"
                      label="mimetype" v-bind="$thx.field" />
                  </v-col>
                </v-row>
              </td>
            </tr>
            <tr>
              <th><v-icon title="headers/cookies">mdi-dock-top</v-icon></th>
              <td>
                <message-items-field v-model="tmpl.request.headers" label="header" />
                <message-items-field v-model="tmpl.request.cookies" label="cookie" />
              </td>
              <td>
                <message-items-field v-model="tmpl.response.headers" label="header" />
                <message-items-field v-model="tmpl.response.cookies" label="cookie" />
              </td>
            </tr>
            <tr>
              <th><v-icon title="body">mdi-dock-bottom</v-icon></th>
              <td>
                <constraints-field v-model="tmpl.request.body"
                  :disabled="tmpl.request.method=='GET'"
                  label="body constraints" v-bind="$thx.field" />
              </td>
              <td>
                <constraints-field v-model="tmpl.response.body"
                  label="body constraints" v-bind="$thx.field" />
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapActions, mapState, mapWritableState } from 'pinia';
import { useTemplateStore } from '@/stores/template';

import tabHeader from '../components/tabHeader.vue';
import markdownField from '@/components/markdownField.vue';
import messageItemsField from '@/editor/components/messageItemsField.vue';
import constraintsField from '@/editor/components/constraintsField.vue';

import Request from '@/models/request';
import Response from '@/models/response';

export default {
  name: 'templateEditor',
  components: {
    tabHeader,
    markdownField,
    messageItemsField,
    constraintsField,
    // itemsField,
    // editMessage,
    // templateMixDialog,
  },
  watch: {
    selected() {
      this.tmpl = this.selected || {request: {}, response: {}};
    }
  },
  methods: {
    clear() {
      if(window.confirm(`delete ${this.selected.name}?`)) {
        this.remove_template(this.selected.name);
        this.selected = null;
        this.tmpl = {
          request: Request.option(),
          response: Response.option(),
        }
      }
    },
    derives() {
      const basename = this.tmpl.name;
      this.selected = null;
      this.tmpl = {
        extend: basename,
        request: Request.option(),
        response: Response.option(),
      }
    },
    ...mapActions(useTemplateStore, [
      'remove_template',
      'create_new',
    ])
  },
  props: {

  },
  computed: {
    has_selection() {
      return this.selected !=null;
    },
    // tmpl() {
    //   return this.selected || this.values;
    // },
    ...mapWritableState(useTemplateStore, [
      'selected',
    ]),
    ...mapState(useTemplateStore, [
      'all',
      'all_tags',
      'datatypes',
      'fields',
    ]),
  },
  data() {
    return {
      show_request: false,
      show_response: false,
      // show_mix: false,
      menus: [
        // { id: 'derive', title: 'derive', callback: this.derives},
        // { id: 'mix', title: 'template mix', callback: ()=>{this.show_mix=true;}},
      ],
      tmpl: {
        request: Request.option(),
        response: Response.option(),
      },
      request_methods: Request.methods,
      response_status: Response.status_all,
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