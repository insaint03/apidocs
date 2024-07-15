<template>
  <v-card flat :color="color">
    <slot name="header">
      <v-card-item>
        <v-card-subtitle>{{ subtitle }}</v-card-subtitle>
        <v-card-title>{{ title }}</v-card-title>
      </v-card-item>
    </slot>
    <v-card-text>
      <slot name="body">
        <!-- queries -->
        <table-items v-if="queries" :items="queries" label="queries"  />
        <!-- cookies -->
        <table-items v-if="modelValue.cookies" :items="modelValue.cookie_items" label="cookies"  />
        <!-- headers -->
        <table-items v-if="modelValue.headers" :items="modelValue.header_items" label="headers"  />
        <!-- body -->
        <datatypeItems v-if="modelValue.body" :datatype="modelValue.body" label="body" />
        <!-- <table-items v-if="modelValue.body && modelValue.body.items" :items="modelValue.body.items" label="body"  /> -->
      </slot>
    </v-card-text>

  </v-card>
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
    color: { type: String, required: false, default: 'primary' },
    title: { type: String, required: false, default: 'title' },
    subtitle: { type: String, required: false, default: 'subtitle' },
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
      return this.modelValue.body;
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