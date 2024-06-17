<template>
  <collapsible-card
    :open="open" @update:open="(v)=>$emit('update:open', v)"
    :card-props="{color: $thx.color.primary}"
    actions
    :title="`_about :${project.name}`" icon="mdi-information" :default-open="false">
    <template #card-item-title>{{ project.name }}</template>
    <template #card-item-subtitle>{{ project.version }}</template>
    <v-row>
      <!-- form links -->
      <v-col cols="12" md="6">
          <view-forms v-model="project" :fields="fields.summary" />
      </v-col>
      <v-col cols="12" md="6">
          <view-forms v-model="project" :fields="fields.desc" />
      </v-col>
    </v-row>

    <template #card-actions>
      <v-spacer />
      <!-- open document history view -->
      <v-btn text disabled>History</v-btn>
      <!-- show license & contributors -->
      <v-btn text disabled>License</v-btn>
      <v-btn text disabled>Terms</v-btn>
      <v-btn text disabled>Contributors</v-btn>
      <!-- open links menu -->
      <v-menu>
        <template #activator="{ props }">
          <v-btn text v-bind="props">Links</v-btn>
        </template>
        <v-list>
          <template v-for="ln in project.links" :key="`link-${ln.title}.${ln.keytype}`">
            <!-- case with ln.links.length <=1 -->
            <template v-if="ln.links.length<=1">
              <v-list-item  :title="ln.title" :subtitle="ln.keytype">
                <template #prepend>
                  <v-icon>{{ $thx.icon.links[ln.keytype] }}</v-icon>
                </template>
                <template #append v-if="0<ln.links.length">
                  <v-btn icon flat @click="()=>window.open(ln.links[0].href, '_blank')">
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-btn>
                </template>
              </v-list-item>
            </template>
            <template v-else>
              <v-list-group>
                <template #activator="{ props }">
                  <v-list-item v-bind="props" :title="ln.title" :subtitle="ln.keytype">
                    <template #prepend>
                      <v-icon>{{ $thx.icon.links[ln.keytype] }}</v-icon>
                    </template>
                  </v-list-item>
                </template>
                <v-list-item v-for="ll in ln.links" :key="`link-${ln.title}-${ll.href}`"
                  :title="ll.anchor" :subtitle="ll.href">
                  <template #prepend>
                    <v-icon>{{ link_icons[ll.keytype] }}</v-icon>
                  </template>
                </v-list-item>
              </v-list-group>
            </template>
          </template>
        </v-list>
      </v-menu>
    </template>
  </collapsible-card>
</template>
<script>
import { mapState } from 'pinia';
import { useProjectStore } from '@/stores/project';
import viewForms from './forms.vue';
import collapsibleCard from '@/components/collapsibleCard.vue';

const link_icons = {
  github: 'mdi-github',
  repository: 'mdi-source-repository',
  wiki: 'mdi-wikipedia',
  issue: 'mdi-ticket-outline',
  issues: 'mdi-ticket-outline',
  docs: 'mdi-file-document',
  document: 'mdi-file-document',
  guideline: 'mdi-file-document',
  license: 'mdi-file-certificate',
  terms: 'mdi-file-document-outline',
  privacy: 'mdi-file-document-outline',
  other: 'mdi-file-document-outline',
}

// const tabs = ['summary', 'legal', 'history'];
const fields = {
  summary: [
    { key: 'name', label: 'project name' },
    { key: 'version', label: 'version' },
    { key: 'summary', label: 'summary' },
    // { key: 'links', label: 'links', is: 'view-items', iconMap: link_icons, itemIcon: 'keytype', ...liner_items,  },
    // { key: 'license', label: 'license', is: 'view-items', ...liner_items, },
  ],
  desc: [
    { key: 'desc', label: 'description', is: 'v-textarea', },
  ],
  legal: [
  //   { key: 'contributors', label: 'contributors', is: 'view-items', ...models.items.liner, },
  //   // { key: 'terms', label: 'terms of use', items: {}, },
  //   // { key: 'privacy', label: 'privacy policy', items: {}, },
  //   { key: 'history', label: 'history', items: {}, },
  ]
}
  
export default {
  name: 'infoViewer',
  components: {
    viewForms,
    collapsibleCard,
  },
  methods: {
    expand_icon(value) {
      return `mdi-chevron-${value?'up':'down'}`;
    }
  },
  props: {
    tab: String,
    open: Boolean,
  },
  computed: {
    ...mapState(useProjectStore, ['project']),
  },
  data() {
    return {
      // tabs,
      fields,
      link_icons,
      show_more: false,
      show_history: false,
      show_license: false,
      show_terms: false,
      show_contributors: false,
      active_tab: this.tab,
    }
  }
}
</script>
