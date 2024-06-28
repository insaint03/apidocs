<template>
  <tool-card location="left">
    <template #title>
      <v-icon>{{ $thx.icon.endpoint }}</v-icon>
      {{ modelValue.summary }}
    </template>

    <template #activator="{ props }">
      <slot name="default" :props="props">
      </slot>
    </template>
    <div>
      <v-chip-group>
        <v-chip v-for="it, ii in modelValue.tagnames" :key="`endpoint-tag-${ii}`"
          :color="$thx.color.template" size="small">{{it}}</v-chip>
      </v-chip-group>
    </div>
    <div>
      <mark-down :model-value="modelValue.desc" />
    </div>
    <v-row>
      <!-- request section -->
      <v-col cols="6">
        <v-list>
          <!-- request method / path -->
          <v-list-item :title="req.pathname" >
            <template #prepend>
              <v-btn text flat size="small" :color="$thx.color.http_method[req.method]">{{ req.method }}</v-btn>
            </template>
          </v-list-item>
          <!-- request queries -->
          <item-list-group v-if="req.queries && 0<req.queries.length" title="queries" :items="req.queries" />
          <!-- request cookies -->
          <item-list-group v-if="req.cookies && 0<req.cookies.length" title="cookies" :items="req.cookies" />
          <!-- request header -->
          <item-list-group v-if="req.headers && 0<req.headers.length" title="headers" :items="req.headers" />
          <!-- request body -->
          <template v-if="req.body">
            <v-divider>body</v-divider>
            <v-list-item>
              <v-list-item-title>
                <v-breadcrumbs :items="req.body.inherits" :color="$thx.color.datatype" />
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ req.body.summary }}
              </v-list-item-subtitle>
            </v-list-item>
          </template>
        </v-list>
      </v-col>
      <!-- response section -->
      <v-col cols="6">
        <!-- todo: response table -->
        <v-list>
          <!-- response status -->
          <v-list-item  :title="resp.mimetype">
            <template #prepend>
              <v-btn text flat size="small" :color="$thx.color.http_status(resp.status)">{{ resp.status_title }}</v-btn>
            </template>
          </v-list-item>
          <!-- response queries -->
          <item-list-group v-if="resp.queries && 0<resp.queries.length" title="queries" :items="resp.queries" />
          <!-- response cookies -->
          <item-list-group v-if="resp.cookies && 0<resp.cookies.length" title="cookies" :items="resp.cookies" />
          <!-- response header -->
          <item-list-group v-if="resp.headers && 0<resp.headers.length" title="headers" :items="resp.headers" />
          <!-- response body -->
          <template v-if="resp.body">
            <v-divider>body</v-divider>
            <v-list-item>
              <v-list-item-title>
                <v-breadcrumbs :items="resp.body.inherits" :color="$thx.color.datatype" />
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ resp.body.summary }}
              </v-list-item-subtitle>
            </v-list-item>
          </template>
        </v-list>
      </v-col>
    </v-row>
  </tool-card>
</template>
<script>
// import Datatype from '@/models/datatype';
import Entity from '@/models/entity';
import toolCard from './toolCard.vue';
// import requestGroup from '@/viewer/components/requestGroup.vue';
// import responseGroup from '@/viewer/components/responseGroup.vue';
import itemListGroup from './itemsListGroup.vue';
// import messageCard from '@/viewer/components/messageCard.vue';

export default {
  name: 'endpointToolCard',
  components: {
    toolCard,
    itemListGroup
    // requestGroup,
    // responseGroup,
    // messageCard,
  },
  methods: {
    type_summary(typename) {
      return Datatype.typeprop(typename, 'summary') || '';
    }
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
