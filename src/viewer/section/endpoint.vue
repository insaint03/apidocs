<template>
  <v-card flat class="my-4" :id="`/endpoint/${index}/`">
    <v-card-item>
      <v-card-title class="d-flex flex-fill">
        <span class="flex-grow">
          {{ entity.summary }}
        </span>
        <v-spacer />
        <v-chip-group :color="$thx.color.tag">
          <v-chip v-for="tag, ti in tags" :key="`ep-tag-${index}.${ti}${tag}`" active readonly
            @click="location.href=`#/tag/${tag.title}/`">
            <v-icon>{{ $thx.icon.tag }}</v-icon>
            &nbsp;
            {{ tag }}
          </v-chip>
        </v-chip-group>
      </v-card-title>
      <v-card-subtitle>
      </v-card-subtitle>
    </v-card-item>
    <v-card-text class="border-t-thin">
      <v-row>
        <v-col>
          <mark-down v-if="entity.desc" :model-value="entity.desc" />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="request">
          <mark-down v-if="request.description" :model-value="request.description" />
          <message-card :model-value="request" 
            :title="method" :subtitle="pathname"
            :color="$thx.color.http_method[method]" :queries="request.queries"> 
            <template #header>
              <v-list-item>
                <template #prepend>
                  <v-btn text flat size="small" readonly :color="$thx.color.http_method[method]">
                  {{ request.method }}
                  </v-btn>
                </template>
                <v-list-item-title>&nbsp;{{ request.pathname }}</v-list-item-title>
              </v-list-item>
            </template>
          </message-card>
        </v-col>
        <v-col class="response">
          <mark-down v-if="response.description" :model-value="response.description" />
          <message-card :model-value="response"
            :title="response.status_title" :subtitle="`${response.mimetype} (${response.status_title})`"
            :color="$thx.color.http_status(status)">
            <template #header>
              <v-list-item>
                <v-list-item-title style="text-align: end;">
                  {{ response.mimetype }}&nbsp;
                </v-list-item-title>
                <template #append>
                  <v-btn text flat size="small" readonly :color="$thx.color.http_status(status)">
                    {{ response.status_title }}
                  </v-btn>
                </template>
              </v-list-item>
            </template>
          </message-card>
        </v-col>
      </v-row>
    </v-card-text>
    <!-- actions later -->
    <v-card-actions>
      <v-spacer />
      <v-btn text disabled>Explore</v-btn>
    </v-card-actions>
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