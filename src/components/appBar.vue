<template>
  <v-app-bar app flat dark density="compact" color="primary">
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-spacer />
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props">
          <v-icon>{{ icon }}</v-icon>
        </v-btn>
      </template>
      <v-list>
        <slot></slot>
      </v-list>
    </v-menu>
    <!-- 
      <template #extension>
        <v-tabs background-color="primary" dark>
          <v-tab v-for="(rt,ri) in routes" :key="`nav-${ri}`" :to="`${rt.path}`">
            {{ rt.component.name }}
          </v-tab>
        </v-tabs>
      </template>
      -->
  </v-app-bar>
</template>

<script>
import routes from '@/views';

export default {
  name: 'appBar',
  props: {
    title: { type: String, required: false, default: 'ApiDocs' },
    icon: { type: String, required: false, default: () => 'mdi-dots-vertical' }
  },
  data() {
    return {
      routes,
    }
  },
}
</script>