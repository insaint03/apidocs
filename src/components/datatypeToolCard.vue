<template>
  <tool-card :title="modelValue.name" :subtitle="modelValue.summary" :location="location">
    <template #title>
      <v-icon>{{ $thx.icon.datatype }}</v-icon>
      {{ modelValue.name }}
    </template>
    <template #items>
      <v-chip size="small">{{ modelValue.inherits.join(' / ') }}</v-chip>
    </template>
    <template #activator="{ props }">
      <slot name="default" :props="props"></slot>
    </template>
    <template #prefix v-if="modelValue.summary">
      // {{ modelValue.summary }}
    </template>
    <v-row>
      <v-col v-if="modelValue.desc">
        <mark-down :model-value="modelValue.desc" />
      </v-col>
      <v-col v-if="modelValue.items!=null">
        <datatype-items :datatype="modelValue" no-expand />
      </v-col>
    </v-row>
  </tool-card>
</template>

<script>
import Datatype from '@/models/datatype';
import toolCard from './toolCard.vue';
// import itemsTree from '@/viewer/components/itemsTree.vue';
import datatypeItems from '@/viewer/components/datatypeItems.vue';

export default {
  name: 'datatype-tool-card',
  components: {
    toolCard,
    // itemsTree,
    datatypeItems,
    // datatypeItems,
  },
  methods: {
    inheritance(typename) {
      return Datatype.find(typename, true).inherits;
    },
    summarize(typename) {
      return ':'+Datatype.find(typename, true).summary;
    }
  },
  props: {
    location: {type:String, default: 'bottom'},
    modelValue: Datatype,
  },
  data() {
    return {
      datatype: this.modelValue,
    };
  }
}
</script>

<stype scoped>

</stype>