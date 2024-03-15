<template>
  <v-container>
    <v-row>
      <v-col>
        <list-card title="items" :items="items" :key="`items-updated.${last_updated}`" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'pinia'
import { useStockStore } from '@/stores/stock'

import listCard from '@/components/listCard.vue'

export default {
  name: 'indexView',
  components: {
    listCard,
  },
  watch: {
    items() {
      this.last_updated = Date.now();
    }
  },
  computed: {
    ...mapState(useStockStore, ['items']),
  },
  data() {
    // const stock = useStockStore();
    return {
      last_updated: Date.now(),
    };
  }
}
</script>