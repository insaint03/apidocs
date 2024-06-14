<template>
  <v-card rounded="md" flat>
    <v-toolbar :color="$thx.color.api">
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
        <v-btn text :active="show_all_requests" @click="show_all_requests = !show_all_requests">req.</v-btn>
        <v-btn text :active="show_all_responses" @click="show_all_responses = !show_all_responses">resp.</v-btn>
        <v-btn icon :active="expanded" @click="expanded = !expanded">
          <v-icon>{{ $thx.expanding_icon(expanded) }}</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card-text>
      <v-row v-for="ep, ei in endpoints" :key="`ep-${endpath}.${ei}`">
        <v-col>
          <v-card flat :color="$thx.color.api">
            <v-toolbar flat density="compact" @click="show[ei].fill = !show[ei].fill" >
              <v-toolbar-items>
                <v-btn text readonly :color="$thx.color.http_method[ep.method]">
                  {{ ep.method }}
                </v-btn>
                <v-btn text readonly style="text-transform: none;">
                  {{ ep.pathname }}
                </v-btn>
              </v-toolbar-items>
              <i>:{{ ep.title }}</i>
              <v-spacer />
              <v-toolbar-items>
                <v-btn text readonly>
                  {{ ep.status }}
                  {{ ep.responses }}
                </v-btn>
                <v-btn icon :active="show[ei].fill">
                  <v-icon>{{ $thx.expanding_icon(show[ei].fill) }}</v-icon>
                </v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <v-card-text v-show="show[ei].fill">
              <v-textarea :model-value="ep.description" readonly v-bind="$thx.field" />
              <v-row>
                <v-col v-show="show[ei].request">
                  <request-view :request="ep.request" />
                  <!-- 
                <view-forms :model-value="ep.request" :fields="fields.request" />
              -->
                </v-col>
                <v-col v-show="show[ei].response">
                  <!--
                <view-forms :model-value="ep.response" :fields="fields.response" />
                -->
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions v-show="show[ei].fill">
              <v-spacer />
              <v-btn text :active="show[ei].request"
                @click="show[ei].request = !show[ei].request">req.</v-btn>
              <v-btn text :active="show[ei].response"
                @click="show[ei].response = !show[ei].response">resp.</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import viewForms from './forms.vue';
import requestView from './request.vue';
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
    viewForms,
    requestView,
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
    return {
      show: (new Array(this.endpoints.length))
        .fill()
        .map(() => ({ fill: true, request: true, response: true })),
      fields,
    };
  }
}
</script>