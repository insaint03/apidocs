<template>
  <v-list flat slim density="compact">
    <slot name="header"></slot>
    <table-items v-if="queries && 0<queries.length" label="queries" :items="modelValue.query_items" />
    <table-items v-if="cookies && 0<cookies.length" label="cookies" :items="modelValue.cookie_items" />
    <table-items label="headers" :items="modelValue.header_items" />
    <!-- queries if exists -->
    <!-- headers -->
    <!-- cookies -->
    <!-- body -->
    <template v-if="bodytype">
      <v-divider>body</v-divider>
      <v-list-item>
        <datatype-items :datatype="bodytype" />
      </v-list-item>
    </template>
    <slot name="footer"></slot>

  </v-list>
</template>
<script>
import Message from '@/models/message';
import tableItems from './tableItems.vue';
import datatypeItems from './datatypeItems.vue';

export default {
  name: 'messageCard',
  components: {
    tableItems,
    datatypeItems,
  },
  props: {
    modelValue: Message,
    // color: { type: String, required: false, default: 'primary' },
    // title: { type: String, required: false, default: 'title' },
    // subtitle: { type: String, required: false, default: 'subtitle' },
    // queries: { type: Array, required: false, default: null}
  },
  computed: {
    queries() {
      return this.modelValue.queries;
    },
    cookies() {
      return this.modelValue.cookies;
    },
    headers() {
      return this.modelValue.headers;
    },
    bodytype() {
      return this.modelValue.bodytype;
    },
    items() {
      return this.modelValue.body.items;
    }
  },
  data() {
    return {

    };
  },
}
</script>