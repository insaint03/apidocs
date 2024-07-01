<template>
  <v-card flat>
    <v-card-item>
      <v-card-actions>
        <v-spacer />
        <v-btn text flat v-bind="$thx.btn" color="primary">
          {{ selected ? 'save' : 'create' }}
        </v-btn>
      </v-card-actions>
      <v-card-title>
        {{ tmpl.name }}
        &nbsp;
        <v-chip v-if="tmpl.tagname" readonly :color="$thx.color.tag" :title="`#${tmpl.tagname}`">
          <v-icon size="small">{{ $thx.icon.tag }}</v-icon>{{ tmpl.tagname }}
        </v-chip>
      </v-card-title>
      <v-card-subtitle v-if="tmpl.extends">
        / {{ tmpl.extends }}
      </v-card-subtitle>
    </v-card-item>
    <v-card-text>
      <v-form>
        <!-- common setup -->
        <v-row>
          <v-col>
            <v-text-field v-model="tmpl.name" label="name" v-bind="$thx.field" />
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
        <!-- request -->
        <v-row>
          <v-col>
            <v-divider><v-label>Req.</v-label></v-divider>
            <v-row>
              <v-col>
                <v-text-field v-model="tmpl.request.method" label="method" v-bind="$thx.field" />
              </v-col>
              <v-col>
                <v-text-field :model-value="tmpl.request.pathname" label="pathname" v-bind="$thx.field" />
              </v-col>
            </v-row>
            <v-textarea v-model="tmpl.request.desc" label="description" v-bind="$thx.field" />
            <v-textarea label="query" :model-value="tmpl.request.query_texts" @change="($ev)=>tmpl.queries=$ev.taget.value" v-bind="$thx.field" />
            <v-textarea label="cookie" :model-value="tmpl.request.cookie_texts" @change="($ev)=>tmpl.cookies=$ev.taget.value" v-bind="$thx.field" />
            <v-textarea label="header" :model-value="tmpl.request.header_texts" @change="($ev)=>tmpl.headers=$ev.taget.value" v-bind="$thx.field" />
            <v-textarea label="body constraints" :model-value="tmpl.request.body" 
              :items="datatypes" item-title="name" response-object v-bind="$thx.field" />
          </v-col>
          <v-divider vertical>
            <v-icon size="small">mdi-chevron-triple-right</v-icon>
          </v-divider>
          <v-col>
            <v-divider><v-label>Resp.</v-label></v-divider>
            <v-row>
              <v-col>
                <v-text-field v-model="tmpl.response.status_title" label="status" v-bind="$thx.field" />
              </v-col>
              <v-col>
                <v-text-field v-model="tmpl.response.mimetype" label="mimetype" v-bind="$thx.field" />
              </v-col>
            </v-row>
            <v-textarea v-model="tmpl.response.desc" label="description" v-bind="$thx.field" />
            <v-textarea label="query" :model-value="tmpl.response.query_texts" @change="($ev)=>tmpl.queries=$ev.taget.value" v-bind="$thx.field" />
            <v-textarea label="cookie" :model-value="tmpl.response.cookie_texts" @change="($ev)=>tmpl.cookies=$ev.taget.value" v-bind="$thx.field" />
            <v-textarea label="header" :model-value="tmpl.response.header_texts" @change="($ev)=>tmpl.headers=$ev.taget.value" v-bind="$thx.field" />
            <v-textarea label="body constraints" :model-value="tmpl.response.body" 
              :items="datatypes" item-title="name" response-object v-bind="$thx.field" />
          </v-col>
        </v-row>

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

import markdownField from '@/components/markdownField.vue';

export default {
  name: 'templateEditor',
  components: {
    markdownField,
  },
  watch: {
    selected() {
      this.tmpl = this.selected || {request: {}, response: {}};
    }
  },
  methods: {

  },
  props: {

  },
  computed: {

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
      tmpl: {
        request: {},
        response: {},
      },
    };
  }
}
</script>