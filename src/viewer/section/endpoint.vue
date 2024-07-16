<template>
  <v-card flat :id="`/endpoint/${index}/`" class="border-thin my-2">
    <v-card-item>
      <v-toolbar class="inherited" density="compact"  @click="expand=!expand">
        <v-toolbar-title>
          {{  entity.summary  }}
        </v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-btn readonly :color="$thx.color.http_method[method]" style="text-transform: none;">
            <span class="request method">[{{ method }}]</span>
            <span class="request pathname">{{ pathname }}</span>
          </v-btn>
          <v-divider vertical />
          <v-btn readonly :color="$thx.color.http_status(status)" style="text-transform: none;">
            &nbsp;
            {{ response.mimetype }}
            <v-chip size="small" :color="$thx.color.datatype">{{ response.body }}</v-chip>
            :{{ response.status_title }}
          </v-btn>
          <v-btn readonly style="text-transform: none;" :color="$thx.color.http_status(status)" 
            :href="`#/datatype/${response.body.name}/`" @click.stop>
          </v-btn>
          <v-btn icon readonly>
            <v-icon>{{ $thx.expanding_icon(expands) }}</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text v-show="expand">
        <v-row>
          <v-col>
            <mark-down :model-value="desc" v-if="desc" />
            <v-autocomplete 
              :model-value="tags" 
              prepend-inner-icon="mdi-tag" menu-icon="mdi-blank"
              multiple chips label="tags" variant="outlined" readonly>
              <template #chip="{item}">
                <v-chip variant="flat" :color="$thx.color.tag" active readonly class="ma-1" v-bind="item"
                  @click="location.href=`#/tag/${item.title}/`" />
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
              :title="response.status_title" :subtitle="`${response.mimetype} (${response.status_title})`"
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