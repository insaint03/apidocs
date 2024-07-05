<template>
  <tab-header :icon="$thx.icon.tag" :color="$thx.color.tag" :menus="menus">
    <template #title>
      {{ tmpl.name || 'Template' }}
    </template>
  </tab-header>
  <v-card flat>
    <v-card-item>
      <!-- <v-card-title>
        {{ tmpl.name }}
        &nbsp;
        <v-chip v-if="tmpl.tagname" readonly :color="$thx.color.tag" :title="`#${tmpl.tagname}`">
          <v-icon size="small">{{ $thx.icon.tag }}</v-icon>{{ tmpl.tagname }}
        </v-chip>
      </v-card-title> -->
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
        <edit-message v-show="has_selection" v-model="tmpl" mode-template />
      </v-form>
    </v-card-text>

    <V-card-actions>
      <v-btn text flat v-bind="$thx.btn" color="primary">
          {{ selected ? 'save' : 'create' }}
        </v-btn>
      <v-spacer />
      <v-btn text flat v-bind="$thx.btn" color="danger" :disabled="!selected">
        delete
      </v-btn>
    </V-card-actions>
  </v-card>
</template>
<script>
import { mapActions, mapState, mapWritableState } from 'pinia';
import { useTemplateStore } from '@/stores/template';

import tabHeader from '../components/tabHeader.vue';
import markdownField from '@/components/markdownField.vue';
import editMessage from '@/editor/components/editMessage.vue';
// import templateMixDialog from '@/editor/components/templateMixDialog.vue';

export default {
  name: 'templateEditor',
  components: {
    tabHeader,
    markdownField,
    editMessage,
    // templateMixDialog,
  },
  watch: {
    selected() {
      this.tmpl = this.selected || {request: {}, response: {}};
    }
  },
  methods: {
    clear() {
      this.selected = [];
      this.tmpl = {
        request: {},
        response: {},
      }
    },
    derives() {
      const basename = this.tmpl.name;
      this.selected = [];
      this.tmpl = {
        extend: basename,
        request: {},
        response: {},
      }
    },
    ...mapActions(useTemplateStore, [
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
        request: {},
        response: {},
      },
    };
  }
}
</script>