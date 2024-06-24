<template>
  <tool-card>
    <template #title>
      <v-icon>{{ $thx.icon.endpoint }}</v-icon>
      {{ modelValue.summary }}
    </template>
    <template #subtitle>
      <div class="d-flex flex-fill align-center justify-between">
        <request-group :request="req" size="small" />
        <v-spacer />
        <response-group :response="resp" size="small" />
      </div>
    </template>

    <template #activator="{ props }">
      <slot name="default" :props="props">
      </slot>
    </template>
    <div>
      <v-chip-group>
        <v-chip v-for="it, ii in modelValue.tags" :key="`endpoint-tag-${ii}`">
          {{ it }}
        </v-chip>
      </v-chip-group>
    </div>
    <div>
      <mark-down :model-value="modelValue.desc" />
    </div>
    <v-row>
      <v-col cols="6">
        <!-- todo: request table -->
        <message-card :model-value="req"
          :color="$thx.color.http_method[req.method]"
          :queries="req.queries">
          <!-- clear out header area -->
          <template #header>{{ req.method }}</template>
        </message-card>
      </v-col>
      <v-col cols="6">
        <!-- todo: response table -->
        <message-card :model-value="resp"
          :color="$thx.color.http_status(resp.status)">

        </message-card>
      </v-col>
    </v-row>
  </tool-card>
</template>
<script>
import Entity from '@/models/entity';
import toolCard from './toolCard.vue';
import requestGroup from '@/viewer/components/requestGroup.vue';
import responseGroup from '@/viewer/components/responseGroup.vue';
import messageCard from '@/viewer/components/messageCard.vue';

export default {
  name: 'endpointToolCard',
  components: {
    toolCard,
    requestGroup,
    responseGroup,
    messageCard,
  },
  props: {
    modelValue: Entity,
  },
  computed: {
    req() { return this.modelValue.request },
    resp() { return this.modelValue.response },
  },
  data() {
    return {
      endpoint: this.modelValue,
    };
  }
}
</script>
