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
      <!-- search -->
      <v-spacer />
      <v-text-field label="search" density="compact" hide-details single-line append-icon="mdi-magnify" clearable />
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
            { title: 'edit', action: ()=>{ this.$router.push('/') }}, 
            { title: 'view', action: ()=>{ this.$router.push('/view')} },
            { title: 'guide', action: null },
            { title: 'specification', action: null },
          ]
        },
        {
          title: 'info', items: [
            { title: 'about apidocs' },
          ]
        },
      ],
      extension: true,
      drawer: false,
    };
  },
}
</script>