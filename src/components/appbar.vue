<template>
  <v-app-bar flat absolute color="black" order="1" :extended="extension" progress scroll-behavior="hide">
    <v-menu>
      <template #activator="{ props }">
        <v-app-bar-nav-icon v-bind="props" />
      </template>
      <v-list density="compact">
        <v-list-group v-for="menu in menus" :key="`appbar-menu.${menu.title}`">
          <template #activator="{ props }">
            <v-list-item v-bind="props" :title="menu.title" append-icon="mdi-chevron-right" @click.stop />
          </template>
          <v-list-item v-for="item in menu.items" :key="`appbar-menu.${menu.title}.${item.title}`">
            <v-list-item :title="item.title" @click="item.action" :disabled="item.action == null" />
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-menu>
    <v-toolbar-title>apiDocs</v-toolbar-title>
    <v-spacer />
    <v-toolbar-items>
      <!-- download current -->
      <v-btn icon @click="download_dialog=true" :title="`download`">
        <v-icon>mdi-download</v-icon>
      </v-btn>
      <!-- change mode -->
      <v-btn icon @click="move_mode" :title="`go ${other_mode}`">
        <v-icon>{{ mode_icon }}</v-icon>
      </v-btn>
      <!-- toggle extension -->
      <v-btn icon @click="extension = !extension">
        <v-icon>{{ extension ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-toolbar-items>

    <template v-if="extension" #extension>
      <v-tabs>
        <v-menu v-for="menu in menus" :key="`app-ext-menu.${menu.title}`">
          <template #activator="{ props }">
            <v-tab v-bind="props" :activate="false">
              {{ menu.title }}
            </v-tab>
          </template>
          <v-list density="compact">
            <v-list-item v-for="item in menu.items" :key="`app-ext-menu.${menu.title}.${item.title}`">
              <v-list-item :title="item.title" @click="item.action" :disabled="item.action == null" />
            </v-list-item>
          </v-list>
        </v-menu>
      </v-tabs>
      <!-- TODO: search
      <v-spacer />
      <v-text-field label="search" density="compact" hide-details single-line append-icon="mdi-magnify" clearable />
       -->
    </template>
  </v-app-bar>
  <open-dialog v-model="import_dialog" />
  <embed-dialog v-model="embed_dialog" :location="location" />
  <download-dialog v-model="download_dialog" />
</template>

<script>
import { mapActions,mapState } from 'pinia';
import { useProjectStore } from '@/stores/project';

import openDialog from './openDialog.vue';
import embedDialog from '@/components/dialogs/embed.vue'
import downloadDialog from '@/components/dialogs/download.vue';

export default {
  name: 'appBar',
  components: {
    openDialog,
    embedDialog,
    downloadDialog,
  },
  mounted() {
    console.log(this.$router.currentRoute.value.name);
  },
  methods: {
    async with_progress(action) {
      this.progress = true;
      try {
        const ret = await action();

        return ret;
      } finally {
        this.progress = false;
      }
    },
    async clear() {
      return await this.with_progress(() => this.clears());
    },
    open(href) {
      window.open(href, '_blank');
    },
    move_mode() {
      this.$router.push(`/${this.other_mode}`);
    },
    ...mapActions(useProjectStore, [
      'clears',
      'loads',
      'caches',
      'revoke',
      'saves',
      'recovers',
    ]),
  },
  computed: {
    mode() {
      return this.$router.currentRoute.value.name;
    },
    viewer_mode() {
      return /^view$/i.test(this.mode);
    },
    other_mode() {
      return this.viewer_mode ? 'edit' : 'view';
    },
    mode_icon() {
      return this.viewer_mode ? 'mdi-pencil' : 'mdi-eye';
    },
    
    ...mapState(useProjectStore, [
      'location',
    ]),
  },
  data() {
    return {
      progress: true,
      import_dialog: false,
      embed_dialog: false,
      download_dialog: false,
      menus: [
        {
          title: 'file', items: [
            { title: 'clear new', action: ()=>{ this.clears() }  },
            { title: 'open/import...', action: ()=>{ this.import_dialog=true; } },
            { title: 'embedding...', action: ()=>{ this.embed_dialog=true;} },
            { title: 'save/download...', action: ()=>{ this.download_dialog=true;} },
            { title: 'export migration' },
            { title: 'export as openapi spec' },
          ]
        },
        {
          title: 'view', items: [
            { title: 'theme configure' },
            { title: 'locale...' },
          ]
        },
        {
          title: 'go', items: [
            { title: 'issues', action: ()=>this.open('https://github.com/insaint03/apidocs/issues'), },
            { title: 'guide', action: null },
            { title: 'specification', action: null },
            { title: 'about' },
          ]
        },
      ],
      extension: true,
      drawer: false,
    };
  },
}
</script>