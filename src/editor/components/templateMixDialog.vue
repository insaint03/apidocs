<template>
  <v-dialog 
    :model-value="modelValue" 
    @update:model-value="(v)=>$emit('update:model-value', v)"
    style="max-width: 75vw;">
    <v-card>
      <v-card-title>
        <v-label>Template mix</v-label>
      </v-card-title>
      <v-card-text>
        <v-row>
          <template v-for="_,ri in lines" :key="`tmpl-mix-dlg.${ri}`">
            <v-col class="flex-grow">
              <div class="d-flex-inline align-right justify-ends">
                <v-btn text flat @click="lines.splice(ri,1)">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </div>
              <template-mix-list v-model="lines[ri]" />
            </v-col>
            <v-divider vertical />
          </template>
          <v-btn text flat @click="lines.push([])">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn text flat @click="$emit('update:model-value', false)">
          Close
        </v-btn>
        <v-spacer />
        <v-btn text flat :color="$thx.color.primary" @click="build">
          Build
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapState, mapActions } from 'pinia';
import { useTemplateStore } from '@/stores/template';

import Template from '@/models/template';
import templateMixList from './templateMixList.vue';
export default {
  name: 'templateMixDialog',
  methods: {
    build() {
      // build and dispose
      this.builds(this.lines);
      this.$emit('update:model-value', false);
    },
    ...mapActions(useTemplateStore, [
      'builds',
    ]),
  },
  components: {
    templateMixList,
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    ...mapState(useTemplateStore, [
      'all',
      'selected',
    ]),
  },
  data() {
    return {
      lines: [
        // default lines
        [],
        Template.names(...Template.default_mixline()),
        ['_foundation.auth'],
      ],
    }
  }
}

</script>