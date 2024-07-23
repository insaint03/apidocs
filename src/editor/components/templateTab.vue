<template>
  <v-navigation-drawer class="fill-height pa-0"
    order="1" location="right" :model-value="show" permanent>
    <div>
      <v-list-subheader>Templates</v-list-subheader>
      <!-- search control -->
      <v-list-item class="pa-0" color="default">
        <v-text-field
          v-model="search" label="Search & Create" outlined v-bind="$thx.field"
          prepend-inner-icon="mdi-magnify"
          append-inner-icon="mdi-plus-circle"
          hide-details solo clearable
          @click.stop
          @click:append-inner="create_new(search)"
          @keyup.enter.ctrl="create_new(search)" />
      </v-list-item>
    </div>
      <v-divider />
    <v-list
      class="h-75 overflow-auto"
      :color="$thx.color.template"
      @click.stop
      @update:selected="$emit('selected')"
      selectable slim>
    <v-list-item v-for="tmpl,ti in tags" :key="`template-tab.${tmpl.name}.${ti}`"
      :active="selected==tmpl"
      @click="selected = (selected!=tmpl) ? tmpl : null"
      :title="tmpl.name">
      <v-list-item-subtitle>
        <v-icon size="small">{{ $thx.icon.tag }}</v-icon>
        {{ tmpl.tagname }} 
        <template v-if="tmpl.extends">/ {{ tmpl.extends }}</template>
      </v-list-item-subtitle>
    </v-list-item>
    <v-divider />
      <v-list-item v-for="tmpl,ti in none_tags" :key="`template-tab.x.${tmpl.name}.${ti}`"
        :title="tmpl.name" :subtitle="tmpl.extends"
        :active="selected==tmpl"
        @click="selected = (selected!=tmpl) ? tmpl : null" />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapActions, mapState, mapWritableState } from 'pinia';
import { useTemplateStore } from '@/stores/template';

// import Template from '@/models/template';

export default {
  name: 'templateTab',
  methods: {
    create_search() {
      if(this.search && this.all[this.search]==null) {
        this.create_new(this.search);
      }
    },
    ...mapActions(useTemplateStore, [
      'create_new',
    ]),
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
    search_pattern() {
      return this.search
        ? new RegExp(this.search, 'i')
        : /^.*$/i;
    },
    tags() {
      return this.all_tags
        .filter((t)=>!this.search_pattern
        || this.search_pattern.test(t.tagname)
        || this.search_pattern.test(t.name));
    },
    none_tags() {
      return this.all_none_tags
        .filter((t)=>!this.search_pattern
        || this.search_pattern.test(t.name));
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

</script>