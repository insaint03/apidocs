<template>
  <v-card elevation="0">
    <v-card-title>{{ tagname }}</v-card-title>
    <v-card-text>
      <v-row>
        <!-- datatype in short -->
        <v-col>
          <v-list>
            <v-list-subheader>datatypes</v-list-subheader>
            <v-list-item v-for="dt in datatypes" :key="`${tagname}-dtype-${dt.el}`"
              :title="dt.name" :subtitle="dt.origintype">
            </v-list-item>
          </v-list>
        </v-col>
        <!-- endpoints in short -->
        <v-col>
          <v-list>
            <v-list-subheader>apis</v-list-subheader>
            <v-list-item v-for="api in apis" :key="`${tagname}-api-${api.el}`"
              :title="api.title" :subtitle="api.description">
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>

    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: 'tagView',
  props: {
    tagname: String,
    datatypes: Array,
    apis: Array,
  },
  data() {
    return {
    };
  }
}
</script>