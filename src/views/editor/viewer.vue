<template>
  <v-container fluid>
    <v-row>
      <v-col cols="10">
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
      </v-col>
      <v-col cols="2">
        <!-- right side panel for ToC -->
        <v-list>
          <v-list-item>Service</v-list-item>
          <v-list-subheader>enpoint</v-list-subheader>
          <v-list-item-group title="endpoints">
          </v-list-item-group>
          <v-list-subheader>migration</v-list-subheader>
          <v-list-item-group title="dataScheme">
            <v-list-item v-for="p in parameters" :key="p.name" :title="p.name" :subtitle="p.basistype" />
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
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