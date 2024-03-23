<template>
  <v-col :cols="colspan" class="editor-tabcol">
    <v-card :elevation="elevation" class="editor-tabcard" @click="set_focus">
      <v-card-title>{{ title }}</v-card-title>
      <v-container>
        <v-row>
          <v-col :cols="active ? 2 : 12">
            <slot name="unfocused">
              <v-list>
                <v-tooltip>
                  <template #activator="{ props }">
                    <v-list-item title="sample#1" v-bind="props" />
                  </template>
                  <v-card>
                    <v-card-title>sample</v-card-title>
                    <v-card-subtitle>subtitle</v-card-subtitle>
                    <v-card-text>text lorem ipsum</v-card-text>
                  </v-card>
                </v-tooltip>
                <v-list-item title="sample#2" />
                <v-list-item title="sample#3" />
                <v-list-item title="sample#4" />
              </v-list>
            </slot>
          </v-col>
          <v-col v-if="active">
            <slot>
              <v-card-text>
                {{ title }}
              </v-card-text>
            </slot>
          </v-col>
        </v-row>
      </v-container>

      <slot name="actions" />
    </v-card>
  </v-col>
</template>

<script>
import { mapWritableState } from 'pinia';
import { useEditorStore } from '@/stores/editor';

export default {
  name: 'editorTab',
  props: {
    title: {
      type: String,
      default: 'tab'
    },
    elevation: {
      type: Number,
      default: 2
    }
  },
  methods: {
    set_focus() {
      if (!this.active) {
        this.focusing = this.title;
      }
    }
  },
  computed: {
    active() {
      return this.focusing == this.title;
    },
    colspan() {
      return this.active ? null : 1;
    },
    ...mapWritableState(useEditorStore, ['focusing']),
  },
  data() {
    return {
    }
  }
}
</script>

<style scoped>
.v-col {
  padding: 0px;
}

.editor-tabcard {
  min-height: 75vh;
}

.editor-tabcard:hover::after {
  display: none;
}

.v-row {
  margin: 0px;
}
</style>