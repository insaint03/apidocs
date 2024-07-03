<template>
  <v-app>
    <template v-if="project_ready">
      <v-main>
        <v-navigation-drawer app location="right" permanent>
          <table-of-contents
            v-bind="info_bindings"
          />
        </v-navigation-drawer>
        <document-viewer v-if="project_ready"
          v-bind="info_bindings"
        />
      </v-main>
    </template>
    <!-- preloading -->
    <template v-else>
      <div class="d-flex flex-fill fill-height align-center justify-center">
        <v-card loading>
          <v-card-item>
            <v-card-title>Loading</v-card-title>
            <v-card-subtitle>{{ location }}</v-card-subtitle>
          </v-card-item>
          <v-card-text>
            <v-skeleton-loader type="article" />
          </v-card-text>
        </v-card>
      </div>
    </template>
    <app-footer />
  </v-app>
</template>
<script>
import models from '@/models';
import tableOfContents from '@/viewer/toc.vue';
import documentViewer from '@/viewer/document.vue';
import appFooter from '@/components/footer.vue'


export default {
  name: 'embededViewer',
  components: {
    tableOfContents,
    documentViewer,
    appFooter,
  },
  methods: {
    moment(timestamp) {
      return (new Date(timestamp)).toLocaleString();
    },
  },
  mounted() {
    models.loads(this.location)
      .then((values)=>{
        models.state = values;
        // update data at once
        this.project = models.project;
        this.datatypes = models.datatypes;
        this.templates = models.templates;
        this.entities = models.entities;
        this.timestamp = models.timestamp;
        this.project_ready = true;
      })
  },
  props: {
    // datatype location
    location: {type: String, required: true },
    // theme settings
    theme: {type: String, required: false, },
  },
  computed: {
    info_bindings() {
      return {
        project: this.project,
        datatypes: this.datatypes,
        templates: this.templates,
        tags: this.tags,
        entities: this.entities,
        endpathes: this.endpathes,
        endpoints: this.endpoints,
        timestamp: this.timestamp,
      }
    },
  },
  data() {
    return {
      project_ready: false,
      project: {},
      datatypes: {},
      templates: {},
      entities: [],
      endpathes: [],
      endpoints: {},
      tags: [],
      timestamp: 0,
    }
  },
}

</script>