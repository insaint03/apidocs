<template>
  <v-card>
    <v-toolbar density="compact" flat dark>
      <slot name="title"></slot>
      <v-spacer />
      <v-toolbar-items>
        <v-btn icon @click="remove">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card-text>
      <slot>
      </slot>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'formCard',
  props: {
  },
  methods: {
    remove() {
      this.$emit('remove');
    }
  },
  data() {
    return {
    }
  },
}
</script>