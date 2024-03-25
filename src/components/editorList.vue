<template>
  <v-col cols="2" @click="$emit('update:focusing', title)">
    <v-card elevation="1">
      <v-card-actions>
        <v-btn icon="mdi-plus" @click="$emit('add')"></v-btn>
        <v-spacer />
        <v-card-title>{{ title }}</v-card-title>
      </v-card-actions>
      <v-text-field prepend-inner-icon="mdi-filter" v-model="search" label="filter" hide-details variant="outlined" single-line density="compact" />
      <v-list lines="one">
        <template v-for="(it, ii) in items" :key="`${title}-${it.name}.${ii}`">
          <slot name="item" :item="it" :index="ii">
            <v-tooltip>
              <template #activator="{ props }">
                <v-list-item slim v-bind="props" @click="editing=it"
                  :title="it[itemTitle || 'name']" :subtitle="it[itemSubtitle || 'basistype']">
                </v-list-item>
              </template>
              <component :is="form" :model-value="it" readonly />
            </v-tooltip>
          </slot>
        </template>
      </v-list>
    </v-card>
  </v-col>
  <v-col v-if="focusing===title" cols="6" >
    <component :is="form" :model-value="editing" />
  </v-col>
</template>

<script>
// import baseForm from '@/components/forms/baseForm.vue';
import parameterForm from './forms/parameterForm.vue';
import entityForm from './forms/entityForm.vue';
import templateForm from './forms/templateForm.vue';

export default {
  name: 'editorList',
  components: {
    // baseForm,
    parameterForm,
    entityForm,
    templateForm,
  },
  props: {
    title: {
      type: String,
      required: false,
      default: () => 'list',
    },
    focusing: {
      type: String,
    },
    items: {
      type: Array,
      required: false,
      default: () => [],
    },
    itemTitle: {
      type: String,
      required: false,
    },
    itemSubtitle: {
      type: String,
      required: false,
    },
    form: {
      type: String,
      required: false,
    },
  },
  methods: {
    onclick(it) {
      this.$emit('select', it);
    }
  },
  data() {
    return {
      search: null,
      editing: {},
    }
  }
}
</script>