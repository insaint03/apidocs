<template>
  <tool-card :title="modelValue.name" :subtitle="modelValue.summary">
    <template #title>
      <v-icon>{{ $thx.icon.datatype }}</v-icon>
      {{ modelValue.name }}
      &nbsp;
      <sub v-if="modelValue.summary" style="font-style:italic;">// {{ modelValue.summary }}</sub>
    </template>
    <template #subtitle>
      <v-chip size="small">{{ modelValue.inherits.join(' / ') }}</v-chip>
    </template>
    <template #activator="{ props }">
      <slot name="default" :props="props"></slot>
    </template>
    <div class="d-flex">
      <div class="flex-fill pa-1" v-if="modelValue.desc">
        <mark-down :model-value="modelValue.desc" />
      </div>
      <div class="flex-fill pa-1" v-if="modelValue.items!=null">
        <datatype-items :datatype="modelValue" no-expand />
      </div>
    </div>
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