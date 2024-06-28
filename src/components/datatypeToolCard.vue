<template>
  <tool-card :title="modelValue.name" :subtitle="modelValue.summary">
    <template #title>
      <v-icon>{{ $thx.icon.datatype }}</v-icon>
      {{ modelValue.name }}
    </template>
    <template #subtitle>
        <v-breadcrumbs :items="modelValue.inherits" />
    </template>
    <template #activator="{ props }">
      <slot name="default" :props="props"></slot>

    </template>
    <v-row>
      <v-col>
        <mark-down :model-value="modelValue.description" />
      </v-col>
      <v-col v-if="modelValue.items">
        <v-list line="two" density="compact">
          <template v-if="modelValue.is_object">
            <v-list-subheader>properties</v-list-subheader>
            <v-list-item 
              v-for="(it,ii) in modelValue.items" :key="`datatype-item-${ii}`"
              :title="it.key" :subtitle="summarize(it.datatype) || ':'">
              <template #append>
                <v-breadcrumbs :items="inheritance(it.datatype)" class="pa-1" />
              </template>
            </v-list-item>
          </template>
          <template v-else-if="modelValue.is_array">
            
          </template>
        </v-list>
      </v-col>
    </v-row>
  </tool-card>
</template>

<script>
import Datatype from '@/models/datatype';
import toolCard from './toolCard.vue';
// import datatypeItems from '@/viewer/components/datatypeItems.vue';

export default {
  name: 'datatype-tool-card',
  components: {
    toolCard,
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