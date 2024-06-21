<template>
  <v-card flat :id="`/endpoint/${index}/`" class="border-thin my-2">
    <v-card-item>
      <v-toolbar class="inherited" density="compact"  @click="expand=!expand">
        <v-toolbar-items>
          <v-btn readonly :color="$thx.color.http_method[method]">
            {{ method }}
          </v-btn>
        </v-toolbar-items>
        <v-toolbar-title>
          {{  entity.summary  }}
        </v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-btn readonly style="text-transform: none;" :color="$thx.color.http_status(status)" 
            :href="`#/datatype/${response.body.name}/`" @click.stop>
            {{ response.mimetype }}
            {{ response.body.name }}
          </v-btn>
        </v-toolbar-items>
        <v-divider vertical />
        <v-toolbar-items variant="text">
          <v-btn active variant="tonal" size="small" text @click.stop>desc.</v-btn>
          <v-btn active variant="tonal" size="small" text @click.stop>req</v-btn>
          <v-btn active variant="tonal" size="small" text @click.stop>resp</v-btn>
          <v-btn icon>
            <v-icon>{{ $thx.expanding_icon(expand) }}</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text v-show="expand">
        <v-row>
          <v-col>
            <mark-down :model-value="desc" />
            <v-autocomplete 
              :model-value="tags" 
              prepend-inner-icon="mdi-tag" menu-icon="mdi-blank"
              multiple chips label="tags" variant="outlined" readonly>
              <template #chip="{item}">
                <v-chip variant="flat" :color="$thx.color.tag" active readonly class="ma-1" v-bind="item" />
              </template>
            </v-autocomplete>
          </v-col>
        </v-row>
        <v-row>
          <!-- request card -->
          <v-col>
            <message-card :model-value="request" 
              :title="method" :subtitle="pathname"
              :color="$thx.color.http_method[method]" :queries="request.queries" />
          </v-col>
          <!-- response card -->
          <v-col>
            <message-card :model-value="response"
              :title="responses.name" :subtitle="`${mimetype} (${response.status_title})`"
              :color="$thx.color.http_status(status)" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card-item>
  </v-card>
</template>
<script>
// import cardSection from './card.vue';
import messageCard from '@/viewer/components/messageCard.vue';
import Entity from '@/models/entity.js';

export default {
  name: 'endpointSection',
  components: {
    // cardSection,
    messageCard,
  },
  methods: {
    toggle(index) {
      this.expands[index] = !this.expands[index];
    }
  },
  props: {
    index: Number,
    entity: Entity,
    title: String,
    desc: String,
    tags: Array,
    pathname: String,
    method: String,
    status: String,
    request: Request,
    response: Response,
    responses: Object,
  },
  data() {
    return {
      expand: true,
    };
  },
}
</script>
<style scoped>
.inherited {
  background-color: inherit;
  color: inherit;
}
table tr>*:first-child {
  text-align: left;
}
table tr>*:last-child {
  text-align: right;
}
</style>