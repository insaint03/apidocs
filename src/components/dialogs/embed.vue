<template>
  <v-dialog v-bind="$props">
    <v-card flat>
      <v-card-title>
        <v-btn icon flat @click="$emit('update:model-value', false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        Embedding
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field v-model="title" label="HTML DOC title" hint="title of the document" v-bind="$thx.field" />
          <v-text-field v-model="url" label="location" hint="data file location" v-bind="$thx.field" />
          <v-select v-model="theme" label="theme" placeholder="default" disabled v-bind="$thx.field" />
          <v-select v-model="locale" label="locale" placeholder="English" disabled v-bind="$thx.field" />
        </v-form>
        <v-divider @click="clipboard">
          <v-icon>mdi-content-copy</v-icon>
          click to copy
        </v-divider>
        <v-textarea :model-value="html" readonly v-bind="$thx.field" />
      </v-card-text>
      <v-card-actions>
        <v-btn text flat @click="dispose">Close</v-btn>
        <v-spacer />
        <v-btn text flat @click="download">
          <v-icon>mdi-download</v-icon>
          Download
        </v-btn>
        <v-btn text flat @click="clipboard">
          <v-icon>mdi-content-copy</v-icon>
          Copy
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
// import { mapState } from 'pinia';
// import { useProjectStore } from '@/stores/project';

export default {
  name: 'embedDialog',
  props: {
    modelValue: Boolean,
    location: String,
  },
  methods: {
    dispose() {
      this.$emit('update:model-value', false);
    },
    clipboard() {
      navigator.clipboard.writeText(this.html);
      if(window.confirm('copied!')) {
        this.dispose();
      }
    },
    download() {
      const href = URL.createObjectURL(
                new Blob([this.html], 
                {type: 'text/plain'}));
      Object.assign(
        document.createElement('a'),
          { href, download: 'apidocs.html',}
      ).click();
      this.dispose();
    },
  },
  computed: {
    html() {
      const locale = this.locale || 'en';
      const title = this.title || 'API Doc';
      const srv = window.location.origin;
      const url = this.url;
      const theme = this.theme || 'default';
      const sc = 'script';
      const html = `<!DOCTYPE html>
<html lang="${locale}">
 <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title || 'apidocs' }</title>
  <${sc} type="module" crossorigin src="${srv}/embed.js"></${sc}>
  <link rel="stylesheet" crossorigin href="${srv}/assets/index.css">
 </head>
 <body>
  <noscript>No Script: ${title}</noscript>
  <div id="apidoc" location="${url}" locale="${locale}" theme="${theme}"></div>
 </body>
</html>`;
      return html;
    },
  },
  watch: {
    location() {
      this.url = this.location ? ''+this.location : null;
    }
  },
  data() {
    return {
      title: null,
      url: this.location,
      theme: 'default',
      locale: 'en',
    }
  },
}
</script>