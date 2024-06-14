<template>
  <v-list v-model:opened="opentabs" v-if="project!=null">
    <!-- project info -->
    <v-list-subheader>about the project</v-list-subheader>
    <v-list-item :title="project.name" :subtitle="project.version" 
      value="about" :color="$thx.color.primary"
      href="#/about/">
      <template #prepend>
        <v-icon>{{ $thx.icon.about }}</v-icon>
      </template>
    </v-list-item>
    <v-divider />
    <!-- by tag definition -->
    <v-list-subheader>by tag</v-list-subheader>
    <v-list-item v-for="tmpl in tags" :key="`toc.tag-${tmpl.tagname}`"
      value="tag" :color="$thx.color.tag"
      :title="tmpl.tagname" :subtitle="tmpl.summary"
      :href="`#/tag/${tmpl.tagname}`"
    >
      <template #prepend>
        <v-icon>{{ $thx.icon.tag }}</v-icon>
      </template>
    </v-list-item>
    <v-divider />
    <!-- TODO::migration 
    <v-list-group value="migrations">
      <template #activator="{ props }">
        <v-list-item v-bind="props" title="migrations" />
      </template>
      <v-list-item v-for="m in migrations" :key="`toc.mig-${m.migration}`" :title="m.name" :subtitle="m.migration" />
    </v-list-group>
    -->
    <v-divider />
    <v-list-subheader>references</v-list-subheader>
    <!-- datatypes -->
    <v-list-group value="datatypes">
      <template #activator="{ props }">
        <v-list-item v-bind="props" title="datatypes" :color="$thx.color.datatype"
          href="#/datatype/">
          <template #prepend>
            <v-icon>{{ $thx.icon.datatype }}</v-icon>
          </template>
        </v-list-item>
      </template>
      <v-list-item v-for="tp in datatype_list" :key="`toc.datatypes-${tp.name}`"
        :href="`#/datatype/${tp.name}`"
        :title="tp.name" :subtitle="tp.basistype"></v-list-item>
    </v-list-group>
    <v-divider />
    <!-- apis -->
    <v-list-group value="endpoints">
      <template #activator="{ props }">
        <v-list-item v-bind="props" title="endpoints" value="endpoints"
          href="#/endpoint/"
          :color="$thx.color.api">
          <template #prepend>
            <v-icon>{{ $thx.icon.endpoint }}</v-icon>
          </template>
        </v-list-item>
      </template>
      <v-list-item v-for="(ep,ei) in endpathes" :key="`toc.apis-${ei}.${ep}`"       
        :href="`#/endpoint${ep}`" :title="ep" />
    </v-list-group>
  </v-list>
</template>

<script>
import { mapState } from 'pinia';
import { useProjectStore } from '@/stores/project';

export default {
  name: 'tocViewer',
  props: {
    open: Array,
    scrollspy: Object,
  },
  methods: {
    hash(ref) {
      window.location.hash = `#${ref}`;
    },
    move(ref) {
      this.hash(ref.el || ref);
      // const el = document.getElementById(id);
      // if (el) {
      //   el.scrollIntoView({ behavior: 'smooth' });
      // }
    }
  },
  computed: {
    ...mapState(useProjectStore, [
      'project', 
      'datatype_list',
      'templates',
      'endpathes',
      'migrations',

      'tags',
      'tag_datatypes',
      'tag_entities',
      'has_datatypes',
      'has_entities',
    ]),
  },
  data() {
    return {
      opentabs: this.open || [],
      scrolls: this.scrollspy,
    };
  }
}
</script>