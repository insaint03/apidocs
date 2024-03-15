<template>
  <v-card>
    <v-toolbar dark color="primary" density="compact">
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="$emit('add')">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-toolbar>
    <v-row>
      <v-col>
        <v-list lines="two">
          <v-list-item v-for="it in items" :key="`item-${it.id}`"
            :title="it.name" :subtitle="it.description" :prepend-icon="it.icon" />
        </v-list>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'listCard',
  props: {
    title: String,
    items: Array,
  },
  data() {
    return {
    };
  },
}
</script>