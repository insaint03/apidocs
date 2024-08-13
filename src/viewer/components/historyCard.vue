<template>
  <v-card class="history-container" v-intersect="onShow">
    <v-toolbar theme="dark">
      <v-toolbar-title extended>
        {{ project.name || 'project' }}
        version history
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn icon @click="$emit('dispose')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card-text class="border-b-thin history-items">
      <v-list v-model="selected" lines="one" :color="$thx.color.primary">
        <v-list-group v-for="h,hi in history"
          :key="`prj-history.${h.version}.${h.date}-${hi}`">
          <template #activator="{props}">
            <v-list-item v-bind="props" 
              prepend-icon="mdi-history">
              <v-list-item-title>v{{ h.version }}</v-list-item-title>
              <v-list-item-subtitle>
                updated {{ h.date.toLocaleString() }}
              </v-list-item-subtitle>
            </v-list-item>
          </template>
          <liner-list-group :items="h.items.items" :icons="$thx.icon.history" />
        </v-list-group>
      </v-list>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn text @click="$emit('dispose')">
        OK
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import linerListGroup from '@/viewer/components/linerListGroup.vue';
export default {
  name: 'historyCard',
  components: {
    linerListGroup,
  },
  methods: {
    onShow() {
      this.selected = [this.project.version];
    }
  },
  props: {
    project: {type: Object, required: true},
  },
  computed: {
    history() {
      return [].concat(this.project.history)
        .sort((l,r)=>r.version-l.version);
    },
    versions() {
      return this.history.map((h)=>h.version);
    },

  },
  data() {
    return {
      selected: [this.project.version],
    }
  }
}
</script>
<style scoped>
.history-container .history-items {
  min-height: 45vh;
  max-height: 50vh;
  overflow-y: auto;
}
</style>
