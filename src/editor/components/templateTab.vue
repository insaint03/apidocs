<template>
  <v-navigation-drawer class="fill-height pa-0"
    order="1" location="right" 
    :model-value="show" permanent>
    <v-list
      :color="$thx.color.template"
      @click.stop
      selectable slim>
      <v-list-subheader>Templates</v-list-subheader>
      <!-- search control -->
      <v-text-field v-model="search" label="Search" outlined append-icon="mdi-magnify" />
      <!-- migration items -->
      <v-list-item v-for="tmpl,ti in all_tags" :key="`template-tab.${tmpl.name}.${ti}`"
        :active="selected==tmpl"
        @click="selected = (selected!=tmpl) ? tmpl : null"
        :title="tmpl.name">
        <v-list-item-subtitle>
          <v-icon size="small">{{ $thx.icon.tag }}</v-icon>
          {{ tmpl.tagname }} 
          <template v-if="tmpl.extends">/ {{ tmpl.extends }}</template>
        </v-list-item-subtitle>
      </v-list-item>
      <!-- items -->
      <v-divider />
      <v-list-item v-for="tmpl,ti in all_none_tags" :key="`template-tab.x.${tmpl.name}.${ti}`"
        :title="tmpl.name" :subtitle="tmpl.extends"
        :active="selected==tmpl"
        @click="selected = (selected!=tmpl) ? tmpl : null" />
    </v-list>

  </v-navigation-drawer>
</template>

<script>
import { mapState, mapWritableState } from 'pinia';
import { useTemplateStore } from '@/stores/template';

// import Template from '@/models/template';

export default {
  name: 'templateTab',
  methods: {
  },
  props: {
    show: {
      type: Boolean,
      // required: true,
      default: true,
    }
  },
  computed: {
    ordereds() {
      return Object.values(this.templates)
        .sort((a, b) => a.name.localeCompare(b.name));
    },
    items() {
      let filter = this.search
        ? new RegExp(this.search, 'i')
        : /^.*$/i;
      return this.ordereds.filter((it) => filter.test(it.name));
    },
    ...mapWritableState(useTemplateStore, [
      'selected',
    ]),
    ...mapState(useTemplateStore, [
      'all',
      'all_tags',
      'all_none_tags',
    ]),
  },
  data() {
    return {
      value: this.modelValue,
      search: null,
      selection: [],
    }
  }
}

</script>@/stores/project