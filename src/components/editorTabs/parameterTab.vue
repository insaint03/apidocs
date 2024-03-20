<template>
  <editor-tab title="parameters">
    <template #unfocused>
      <editor-list v-model="parameters" @select="select">
      </editor-list>
    </template>

    <!-- default slot, with selection -->
    <template v-if="the_parameter">
      <parameter-form v-model="the_parameter" :key="`editor-param.${on_parameter}`" />
    </template>
    <!-- default slot, on empty selection -->
    <template v-else>
      <v-card-text @click="add_new">
        Generate New
      </v-card-text>
    </template>

    <!-- create new -->
    <template #actions>
      <v-card-actions>
        <v-btn @click="add_new">NEW</v-btn>
      </v-card-actions>
    </template>
  </editor-tab>
</template>
<script>
import Parameter from '@/models/parameter';
import { mapWritableState } from 'pinia';
import { useServiceStore } from '@/stores/service';
import { useEditorStore } from '@/stores/editor';

import editorTab from '@/components/editorTabs/editorTab.vue';
import editorList from '@/components//editorList.vue';
import parameterForm from '@/components/forms/parameterForm.vue';


export default {
  name: 'parameterTab',
  components: {
    editorTab,
    editorList,
    parameterForm,
  },
  methods: {
    select(d) {
      this.the_parameter = d;
    },
    add_new() {
      // this.dialog = true;
      let item = Parameter.create('parameter', 'string');
      this.parameters.push(item);
      this.select(item);
    },
    remove() {
      this.parameters = this.parameters.filter(dt => dt != this.the_parameter);
      // this.the_parameter = null;
    }
  },
  computed: {
    alltypes() {
      return Parameter.all;
    },
    the_parameter: {
      get() { 
        return Parameter.find(this.on_parameter, false);
      },
      set(v) { this.on_parameter = v.name; }
    },
    ...mapWritableState(useEditorStore, ['on_parameter']),
    ...mapWritableState(useServiceStore, ['parameters']),
  },
  data() {
    return {
      primitives: Parameter.primitives,
    };
  },
}
</script>