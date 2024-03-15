<template>
  <v-col :cols="colspan">
    <v-card :elevation="elevation" @click="focusing = title">
      <v-card-title>{{ title }}</v-card-title>
      <template v-if="active">
        <slot>
          <v-card-text>
            {{ title }}
          </v-card-text>
        </slot>
      </template>
      <slot name="unfocused">
        <v-list>
          <v-list-item title="sample#1" />
          <v-list-item title="sample#2" />
          <v-list-item title="sample#3" />
          <v-list-item title="sample#4" />
        </v-list>
      </slot>
      <slot name="actions">
        <v-card-actions>
          <v-btn text @click="dialog = true">
            ADD
          </v-btn>
        </v-card-actions>
      </slot>
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