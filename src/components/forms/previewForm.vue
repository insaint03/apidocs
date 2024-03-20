<template>
  <form-card>
    <template #title>Preview </template>
    <!-- form input -->
    <v-form>
      <v-row>
        <v-col>
        </v-col>
      </v-row>
    </v-form>
    <!-- actions -->
    <template #actions>
      <v-card-actions>
        <v-btn text @click="dispose">Cancel</v-btn>
        <v-spacer />
        <v-btn text @click="dispose">Save</v-btn>
      </v-card-actions>
    </template>
  </form-card>
</template>

<script>
import formCard from '@/components/forms/formCard.vue';

export default {
  name: 'previewForm',
  components: {
    formCard,
  },
  props: {
    value: {
      type: Object,
      required: false,
      default: () => ({})
    },
  },
  methods: {
    dispose() {
      this.$emit('close', false);
    },
  },
  data() {
    return {
      service: Object.assign({}, this.value),
    }
  },
}
</script>