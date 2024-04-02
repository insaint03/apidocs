<template>
  <v-sheet :class="`editor-tabcol ${title} ${focusing} ${is_active?'active':''}`" :elevation="elevation" @click="focusing=title">
    <v-toolbar>
      <!-- starting button -->
      <v-toolbar-items>
        <v-btn icon @click="add"><v-icon>mdi-plus</v-icon></v-btn>
      </v-toolbar-items>
      <!-- title -->
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-row>
      <v-col :cols="is_active ? 2 : 12">
        <v-list class="editor-tablist" lines="two">
          <!-- search control -->
          <v-text-field v-model="search" label="search" hide-details />
          <v-divider />
          <!-- list items -->
          <v-tooltip v-for="item in items" :key="item.id" right>
            <template #activator="{ props }">
              <slot name="item" :item="item" :props="props">

                <v-list-item v-bind="props" @click="select(item)">
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                  <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
                </v-list-item>
              </slot>
            </template>
            <slot name="item-tooltip" :item="item">
              {{ item }}
            </slot>
          </v-tooltip>
        </v-list>
      </v-col>
      <v-col :cols="is_active? 10 : 0">
        <!-- editor form -->
        <template v-if="is_active && editing">
          <slot name="editor" :item="editing" />
        </template>
        <template v-else-if="is_active && items.length<=0">
          <slot name="empty">
            <h3>Editor Span</h3>
          </slot>
        </template>
      </v-col>
    </v-row>
    <div class="d-flex flex-fill">
      <!-- items -->
      <div>
      </div>
    </div>
  </v-sheet>
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
      default: ()=>2
    },
    items: {
      type: Array,
      required: false,
      default: ()=>[],
    },
    itemIndex: {
      type: [String, Number],
      required: false,
      default: ()=>null,
    }
  },
  methods: {
    add() {
      this.$emit('add');
    },
    set_focus() {
      if (!this.is_active) {
        this.focusing = this.title;
      }
    }
  },
  computed: {
    is_active() {
      return this.focusing == this.title;
    },
    colspan() {
      return this.is_active ? null : 1;
    },
    editing: {
      get() {
        return this.itemIndex ? this.items[this.itemIndex] : null;
      },
      set(v) {
        this.$emit('update:itemIndex', this.items.indexOf(v));
      }
    },
    ...mapWritableState(useEditorStore, ['focusing']),
  },
  data() {
    return {
      search: null,
    }
  }
}
</script>

<style scoped>
.v-col {
  padding: 0px;
}

.editor-tabcol {
  width: 10vw;
  margin-left: 0.25vw;
  margin-right: 0.25vw;

  min-height: 75vh;
}
.editor-tabcol:start {
  margin-left: 0.5vw;
}
.editor-tabcol:end {
  margin-right: 0.5vw;
}


.editor-tabcol.active {
  width: 75vw;
}

.editor-tabcol:hover::after {
  display: none;
}

.editor-tablist {
  max-width: 10vw;
}

.v-row {
  margin: 0px;
}
</style>