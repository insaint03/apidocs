<template>
  <editor-tab title="entity" >
    <template #unfocused>
      <editor-list v-model="entities" @select="select">
      </editor-list>
    </template>
    <v-row>
      <v-col>
        <request-form v-model="the_entity" :key="`editor-entity.${on_entity}`">
        </request-form>
      </v-col>
      <v-col>
        <h3>Response</h3>
      </v-col>
    </v-row>
  </editor-tab>
</template>
<script>
import { mapWritableState } from 'pinia';
import { useServiceStore } from '@/stores/service';
import { useEditorStore } from '@/stores/editor';

import editorTab from '@/components/editorTabs/editorTab.vue';
import editorList from '@/components/editorList.vue';
import requestForm from '@/components/forms/requestForm.vue';

export default {
  name: 'entityTab',
  components: {
    editorTab,
    editorList,
    requestForm,
  },
  computed: {
    the_entity: {
      get() { return this.entities[this.on_entity]; },
      set(v) { this.on_entity = this.entities.indexOf(v);},
    },
    ...mapWritableState(useServiceStore, ['entities']),
    ...mapWritableState(useEditorStore, ['on_entity']),
  },
  data() {
    return {
    };
  },
}
</script>