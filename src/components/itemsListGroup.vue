<template>
  <slot name="header">
    <v-divider>{{ title }}</v-divider>
  </slot>
  <template v-for="it,ii in items" :key="`it.list-grp.${title}.${ii}-${it.key}`">
    <slot name="list-item" :item="it" :index="ii">
      <v-list-item>
        <v-list-item-title class="d-flex flex-fill justify-between align-center">
          <div class="d-flex-inline">
            <v-icon v-if="it.required" size="x-small">mdi-exclamation</v-icon>
            {{ it.key }}
          </div>
          <div class="d-flex-inline">
            <v-breadcrumbs :color="$thx.color.datatype" :items="type_inherits(it.datatype || {})" />
          </div>
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ type_summary(it.datatype || {}) }}
        </v-list-item-subtitle>
        <template #append v-if="it.defaults">
          <i>={{ it.defaults }}</i>
        </template>
      </v-list-item>
    </slot>
  </template>
</template>

<script>
import Datatype from '@/models/datatype';
export default {
  name: 'itemsListGroup',
  methods: {
    type_inherits(typename) {
      return Datatype.typeprop(typename, 'inherits') || [];
    },
    type_summary(typename) {
      return Datatype.typeprop(typename, 'summary') || '';
    }
  },
  props: {
    items: Array,
    title: String,
  },
  data() {
    return {
    };
  }
}
</script>