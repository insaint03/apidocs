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
        <div>{{ tag.summary }}</div>
        <mark-down :model-value="tag.desc"  />
      </v-col>
      <v-col>
        <v-list>
          <!-- datatypes -->
          <v-list-subheader title="datatypes" :color="$thx.color.datatype" />
          <v-list-item v-for="dt in datatype_items" :key="`tag-${tag.tagname}.${dt.name}`"
            class="tooltip" :href="`#/datatype/${dt.name}/`"
            :title="dt.localname" :subtitle="dt.summary" 
            :prepend-icon="$thx.icon.datatype" :color="$thx.color.datatype" />
          
          <v-divider />

          <!-- apis -->
          <v-list-subheader title="endpoints" :color="$thx.color.endpoint" />
          <v-list-item v-for="ep,ei in entities" :key="`tag-${tag.tagname}.${ei}`"
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
// import tableItems from '@/viewer/components/tableItems.vue';
// import listItems from '@/viewer/components/listItems.vue';

export default {
  name: 'tagSection',
  components: {
    cardSection,
    requestGroup,
    responseGroup,
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