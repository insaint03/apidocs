<template>
  <v-card flat>
    <v-toolbar>
      <v-toolbar-items>
        <v-btn readonly active :color="$thx.color.http_status(response.status)">
          {{ response.status }}
        </v-btn>
        <v-btn text readonly style="text-transform: none;">
          {{ response.mimetype }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card-text>
      <v-row>
        <v-col>
          <object-items v-if="0<response.cookies.length" :model-value="response.cookies" label="cookies" />
          <object-items v-if="0<response.headers.length" :model-value="response.headers" label="headers" />
          <datatype-view v-if="response.body" :datatype="response.body" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-textarea label="description" :model-value="response.desc" readonly v-bind="$thx.field" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import Response from '@/models/response';
import objectItems from './objectItems.vue';
import datatypeView from './datatype.vue';

export default {
  name: 'responseView',
  components: {
    objectItems,
    datatypeView,
  },
  props: {
    response: Response,
  },
  data() {
    return {
    };
  },
}
</script>