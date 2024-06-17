<template>
  <v-card flat :color="$thx.color.api">
    <v-toolbar flat density="compact" @click="expanding = !expanding">
      <v-toolbar-items>
        <v-btn text readonly style="text-transform: none;">
          {{ ep.pathname }}
        </v-btn>
        <v-btn text readonly active :color="$thx.color.http_method[ep.method]">
          {{ ep.method }}
        </v-btn>
        <v-btn icon readonly>
          <v-icon>mdi-chevron-double-right</v-icon>
        </v-btn>
        <v-btn text readonly active :color="$thx.color.http_status(ep.status)">
          {{  ep.status }}
        </v-btn>
        <v-btn text readonly>
          {{ ep.mimetype }}
        </v-btn>
        <v-btn text readonly>
          {{ ep.responses }}
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-title>
        <sub>
          :{{ ep.title }}
        </sub>
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn icon>
          <v-icon>{{ $thx.expanding_icon(expanding) }}</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card-text v-show="expanding">
      <v-textarea v-show="ep.description" :model-value="ep.description" readonly v-bind="$thx.field" />
      <v-row>
        <v-col v-show="exp_request">
          <request-view :request="ep.request" />
          <!-- 
                <view-forms :model-value="ep.request" :fields="fields.request" />
              -->
        </v-col>
        <v-col v-show="exp_response">
          <response-view :response="ep.response" />
          <!--
                <view-forms :model-value="ep.response" :fields="fields.response" />
                -->
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions v-show="expanding">
      <v-spacer />
      <v-btn text :active="exp_request" @click="exp_request = !exp_request">req.</v-btn>
      <v-btn text :active="exp_response" @click="exp_response = !exp_response">resp.</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import requestView from './request.vue';
import responseView from './response.vue';

export default {
  name: 'entityView',
  components: {
    requestView,
    responseView,
  },
  methods: {

  },
  props: {
    modelValue: Object,
    expand: {type: Boolean, default: true},
    show_request: {type: Boolean, default: true},
    show_response: {type: Boolean, default: true},
  },
  computed: {
    ep() {
      return this.modelValue;
    },
    expanding: {
      get() {
        return this.expand;
      },
      set(value) {
        this.$emit('update:expand', value);
        // this.expand = value;
      }
    },
    exp_request: {
      get() {
        return this.show_request;
      },
      set(value) {
        this.$emit('update:show_request', value);
      }
    },
    exp_response: {
      get() {
        return this.show_response;
      },
      set(value) {
        this.$emit('update:show_response', value);
      }
    }
  },
  data() {
    return {
    }
  }
}
</script>