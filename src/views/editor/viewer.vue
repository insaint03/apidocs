<template>
  <v-scroll>
    <!-- service info area -->
    <v-card>
      <v-toolbar>
        <v-toolbar-title>
          {{ service.title }}
        </v-toolbar-title>
        <v-spacer />
      </v-toolbar>
    </v-card>

  </v-scroll>
  <v-navigation-drawer location="right">
    <v-list-item title="service info" />
    <!-- data migrations -->
    <v-list-group title="datatypes">
      <v-list-item v-for="p in parameters" :key="`view-param-${p.name}`">
        <v-list-item-title>{{ p.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ p.basistype }}</v-list-item-subtitle>
      </v-list-item>
    </v-list-group>
    <v-list-group title="endpoints">
      <v-list-group v-for="tag in tags" :key="`view-tag-${tag}`">
        <!-- TODO: endpoint -->
      </v-list-group>
    </v-list-group>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'pinia';
import { useServiceStore } from '@/stores/service';

export default {
  name: 'viewer',
  computed: {
    tags() {
      return this.entities.reduce((agg, en)=>{
        return agg.concat(en.templates.filter((tmpl)=>agg.includes(tmpl.name)));
      }, []).concat(['unspecified']);
    },
    ...mapState(useServiceStore, [
      'service',
      'parameters',
      'templates',
      'entities',
    ]),
  },
  data() {
    return {
    };
  },
}
</script>