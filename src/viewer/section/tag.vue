<template>
  <card-section :prefix="`tag/${tag.tagname}`">
    <template #card-title>
      <h2>
        <v-btn flat icon readonly :title="`#${tag.tagname}`">
          <v-icon :color="$thx.color.tag">{{ $thx.icon.tag }}</v-icon>
        </v-btn>
        {{ tag.tagname }}
      </h2>
    </template>
    <!-- summary description -->
    <v-row>
      <v-col>
        <i>{{ tag.summary }}</i>
        <mark-down :model-value="tag.descr"  />
      </v-col>
      <v-col>
        <v-list>
          <!-- datatypes -->
          <v-list-subheader title="datatypes" :color="$thx.color.datatype" />
          <template v-for="dt in datatype_items" :key="`tag-${tag.tagname}.${dt.name}`">
            <datatype-tool-card :modelValue="dt">
              <template #default="{props}">
                <v-list-item  v-bind="props"
                  class="tooltip" :href="`#/datatype/${dt.name}/`"
                  :title="dt.localname" :subtitle="dt.summary" 
                  :prepend-icon="$thx.icon.datatype" :color="$thx.color.datatype" />
              </template>
            </datatype-tool-card>
          </template>

          
          <v-divider />

          <!-- apis -->
          <v-list-subheader title="endpoints" :color="$thx.color.endpoint" />
          <template v-for="ep,ei in entities" :key="`tag-${tag.tagname}.${ei}`">
            <endpoint-tool-card :modelValue="ep">
              <template #default="{ props }">
                <v-list-item v-bind="props"
                  class="tooltip" :href="`#/endpoint/${ei+1}/`"
                  :title="ep.summary"
                  :prepend-icon="$thx.icon.endpoint" :color="$thx.color.endpoint">
                  <v-list-item-subtitle>
                    <div class="d-flex flex-fill align-center justify-between">
                      <request-group :request="ep.request" size="small"  />
                      <v-spacer />
                      <response-group :response="ep.response" size="small" />
                    </div>
                  </v-list-item-subtitle>
                </v-list-item>
              </template>
            </endpoint-tool-card>
          </template>
        </v-list>
      </v-col>
    </v-row>
  </card-section>
  
</template>
<script>
import Template from '@/models/template';
import Datatype from '@/models/datatype';
// import Datatype from './datatype.vue';

import cardSection from './card.vue';
import requestGroup from '@/viewer/components/requestGroup.vue';
import responseGroup from '@/viewer/components/responseGroup.vue';
import datatypeToolCard from '@/components/datatypeToolCard.vue'
import endpointToolCard from '@/components/endpointToolCard.vue'
// import tableItems from '@/viewer/components/tableItems.vue';
// import listItems from '@/viewer/components/listItems.vue';

export default {
  name: 'tagSection',
  components: {
    cardSection,
    requestGroup,
    responseGroup,

    datatypeToolCard,
    endpointToolCard,
  },
  props: {
    tag: Template,
    entities: Array,
    // datatypes: Array,
    // entities: Array,
  },
  computed: {
    // datatypes() {
    //   return this.tag.datatypes;
    // },
    datatype_items() {
      return Datatype.finds(...this.tag.datatypes);
    },
    entity_names() {
      return this.entities.map(e => e.el);
    },

  },
}
</script>
<style scoped>

</style>