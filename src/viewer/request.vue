<template>
  <v-card flat>
    <v-toolbar>
      <v-toolbar-items>
        <v-btn readonly active :color="$thx.color.http_method[request.method]">
          {{ request.method }}
        </v-btn>
        <v-btn text readonly style="text-transform: none;">
          {{ request.pathname }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card-text>
      <v-row>
        <v-col>
          <!-- TODO: body if exists -->
          <!-- TODO: queries if exists -->
          <object-items v-if="0<request.queries.length" :model-value="request.queries" label="queries" />
          <!-- TODO: cookies if exists -->
          <object-items v-if="0<request.cookies.length" :model-value="request.cookies" label="cookies" />
          <object-items v-if="0<request.headers.length" :model-value="request.headers" label="headers" />
          <!-- <datatype-view v-if="request.body" :datatype="request.body" /> -->
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-textarea label="description" :model-value="request.desc" readonly v-bind="$thx.field" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>

</template>
<script>
import Request from '@/models/request';
import objectItems from './objectItems.vue';
// import datatypeView from './datatype.vue';

export default {
  name: 'requestView',
  components: {
    objectItems,
    // datatypeView,
  },
  props: {
    request: Request,
  },
  data() {
    return {
    };
  },
}
</script>