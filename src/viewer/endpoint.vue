<template>
  <v-card rounded="md" flat>
    <v-toolbar :color="$thx.color.api" @click="expanded = !expanded" v-intersect.once="(show)=>show?expanded=true:null">
      <v-toolbar-items>
        <v-btn icon readonly>
          <v-icon>{{ $thx.icon.endpoint }}</v-icon>
        </v-btn>
        <v-btn text readonly style="text-transform: none;">
          {{ endpath }}
        </v-btn>
      </v-toolbar-items>
      <v-spacer />
      <v-toolbar-items>
        <v-btn text :active="show_all_requests" @click.stop="show_all_requests = !show_all_requests">req.</v-btn>
        <v-btn text :active="show_all_responses" @click.stop="show_all_responses = !show_all_responses">resp.</v-btn>
        <v-btn icon>
          <v-icon>{{ $thx.expanding_icon(expanded) }}</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card-text>
      <v-row v-for="ep, ei in endpoints" :key="`ep-${endpath}.${ei}`">
        <v-col>
          <entity-view :model-value="ep" 
            v-model:expand="show[ei].fill" 
            v-model:show_request="show[ei].request" 
            v-model:show_response="show[ei].response" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import entityView from './entity.vue';
const fields = {
  left: [
    { key: 'summary', label: 'summary' },
    { key: 'desc', label: 'description', is: 'v-textarea' },
    { key: 'tags', label: 'tags', is: 'v-textarea' },
  ],
  right: [

  ],
  request: [
    { key: 'path', label: 'path' },
    { key: 'method', label: 'method' },
    { key: 'queries', label: 'queries', is: 'v-textarea' },
    { key: 'headers', label: 'headers', is: 'v-textarea' },
    { key: 'cookies', label: 'cookies', is: 'v-textarea' },
    { key: 'body', label: 'body', is: 'v-textarea' },
  ],
  response: [
    { key: 'status', label: 'status' },
    { key: 'headers', label: 'headers', is: 'v-textarea' },
    { key: 'cookies', label: 'cookies', is: 'v-textarea' },
    { key: 'body', label: 'body', is: 'v-textarea' },
  ],

}

export default {
  name: 'endpointView',
  components: {
    entityView,
  },
  props: {
    endpath: String,
    endpoints: Array,
  },
  computed: {
    show_all_requests: {
      get() {
        return this.show.every(s => s.request);
      },
      set(value) {
        this.show.forEach(s => s.request = value);
      },
    },
    show_all_responses: {
      get() {
        return this.show.every(s => s.response);
      },
      set(value) {
        this.show.forEach(s => s.response = value);
      },
    },
    expanded: {
      get() {
        return this.show.every(s => s.fill);
      },
      set(value) {
        this.show.forEach(s => s.fill = value);
      },
    },
  },
  data() {
    // console.log((new Array(this.endpoints.length).fill()));
    const shows = {fill: true, request: true, response: true};
    return {
      show: (new Array(this.endpoints.length))
        .fill()
        .map(() => ({...shows})),
      fields,
    };
  }
}
</script>