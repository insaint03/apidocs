<template>
  <tool-card :title="modelValue.summary" >
    <template #title>
      <v-icon>{{ $thx.icon.endpoint }}</v-icon>
      &nbsp;
      {{ modelValue.summary }}
    </template>
    <template #items>
      <v-chip v-for="it, ii in modelValue.tagnames" :key="`endpoint-tag-${ii}`"
        :color="$thx.color.template" size="small">
        <v-icon size="x-small">{{ $thx.icon.tag }}</v-icon>
        {{it}}
      </v-chip>
    </template>
    <template #activator="{ props }">
      <slot name="default" :props="props"></slot>
    </template>
    <v-row>
      <!-- request section -->
      <v-col>
        <!-- request section -->
        <v-sheet class="pa-2" theme="dark">
          <!-- request definition -->
          <div>
            <v-btn text readonly size="small" :color="$thx.color.http_method[req.method]">
              {{ req.method }}
            </v-btn>
            &nbsp;
            {{ req.pathname }}
          </div>
          <template v-if="req.queries && 0<req.queries.length">
            <div v-for="q,qi in req.query_items" :key="`ep-tool.${q.key}.${qi}`">
              <span class="request query">{{ qi<=0 ? '?' : '&' }}</span>
              <strong>{{ q.key }}</strong> =
              &nbsp;
              <v-chip size="small">{{ inherits_of(q.datatype).join(' / ') }}</v-chip>
            </div>
          </template>
          <!-- header, cookies -->
          <template v-if="req.headers && 0<req.headers.length">
            <v-divider>headers</v-divider>
            <div v-for="h,hi in req.header_items" :key="`ep-tool.${h.key}.${hi}`">
              <strong>{{ h.key }}</strong> :
              &nbsp;
              <v-chip size="small">{{ inherits_of(h.datatype).join(' / ') }}</v-chip>
            </div>
          </template>
          <template v-if="req.cookies && 0<req.cookies.length">
            <v-divider>cookies</v-divider>
            <div v-for="c,ci in req.cookie_items" :key="`ep-tool.${c.key}.${ci}`">
              <strong>{{ c.key }}</strong> :
              &nbsp;
              <v-chip size="small">{{ inherits_of(c.datatype).join(' / ') }}</v-chip>
            </div>
          </template>
          <template v-if="req.body!=null">
            <v-divider>body</v-divider>
            <v-chip size="small">{{ inherits_of(req.bodytype).join(' / ') }}</v-chip>
          </template>
        </v-sheet>
      </v-col>
      <!-- response section -->
      <v-col>
        <v-sheet class="pa-2" theme="dark">
          <!-- response definition -->
          <div>
            {{ resp.status_title }} {{ resp.status_code }}
            &nbsp;
            {{ resp.mimetype }}
          </div>
          <!-- header, cookies -->
          <template v-if="resp.headers && 0<resp.headers.length">
            <v-divider>headers</v-divider>
            <div v-for="h,hi in resp.header_items" :key="`ep-tool.${h.key}.${hi}`">
              <strong>{{ h.key }}</strong> :
              &nbsp;
              <v-chip size="small">{{ inherits_of(h.datatype).join(' / ') }}</v-chip>
            </div>
          </template>
          <template v-if="resp.cookies && 0<resp.cookies.length">
            <v-divider>cookies</v-divider>
            <div v-for="c,ci in resp.cookie_items" :key="`ep-tool.${c.key}.${ci}`">
              <strong>{{ c.key }}</strong> :
              &nbsp;
              <v-chip size="small">{{ inherits_of(c.datatype).join(' / ') }}</v-chip>
            </div>
          </template>
          <template v-if="resp.bodytype">
            <v-divider>body</v-divider>
            <v-chip size="small">{{ inherits_of(resp.bodytype).join(' / ') }}</v-chip>
          </template>
        </v-sheet>
      </v-col>
    </v-row>
    &nbsp;
    <div v-if="modelValue.desc">
      <mark-down :model-value="modelValue.desc" />
    </div>
  </tool-card>
</template>
<script>
import Datatype from '@/models/datatype';
import Entity from '@/models/entity';
import toolCard from './toolCard.vue';
// import messageCard from '@/viewer/components/messageCard.vue';
// import tableItems from '@/viewer/components/tableItems.vue';
// import itemsTree from '@/viewer/components/itemsTree.vue';

export default {
  name: 'endpointToolCard',
  components: {
    toolCard,
    // messageCard,
    // tableItems,
    // itemsTree,
  },
  methods: {
    summary_of(typename) {
      return Datatype.typeprop(typename, 'summary') || '';
    },
    inherits_of(typename) {
      return Datatype.typeprop(typename, 'inherits') || [];
    },
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
