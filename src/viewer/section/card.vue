<template>
  <v-card :id="`/${prefix}/`" flat>
    <v-card-title class="d-flex justify-between align-center">
      <div>
        <slot name="card-title"></slot>
      </div>
      <v-spacer />
      <slot name="items">
        <v-btn-group v-if="0<items.length" density="compact">
          <v-btn v-for="it,ii in items" :key="`section-toggle-${it}.${ii}`" text flat
            size="small"
            :color="expanding.includes(it)?color:'default'"
            @click="toggle(it)">
            {{ it }}
          </v-btn>
        </v-btn-group>
      </slot>
    </v-card-title>
    <v-divider />
    <!-- defaults -->
    <v-card-text>
      <v-row>
        <v-col>
          <slot></slot>
        </v-col>
      </v-row>
      <v-row>
        <template v-for="it,ii in items" :key="`card-${it}.${ii}`">
          <v-col v-show="expanding.includes(it)">
            <slot :name="`card-more-${it}`" :item="it" :index="ii"></slot>
          </v-col>
        </template>
      </v-row>
    </v-card-text>
    <slot name="append"> </slot>
  </v-card>
</template>
<script>
export default {
  name: 'cardSection',
  methods: {
    shows(item, show) {
      if(show) {
        this.expanding = this.expanding.concat(item);
        this.expanding = this.expanding.filter((it, i, a)=>a.indexOf(it)===i);
      } else {
        this.expanding = this.expanding.filter((it)=>it!==item);
      }
      // emit event
      this.$emit(`show:${item}`, show);
    },
    toggle(item) {
      this.shows(item, !this.expanding.includes(item));
    },
  },
  props: {
    items: {type: Array, required: false, default: ()=>[]},
    color: {type: String, default: null},
    prefix: {type: String, default: '/'},
    expandDefaults: {type: Object, default: ()=>({})},
  },
  computed: {
    expand_all: {
      get() {
        return this.expanding.length === this.items.length
      },
      set(v) {
        this.expanding = !v ? [] 
          : [].concat(this.items);
        //
        this.items.forEach((it)=>this.$emit(`show:${it}`, v));
        this.last_updated = Date.now();
      }
    },
  },
  data() {
    return {
      expanding: [].concat(this.items.filter((it)=>this.expandDefaults[it])),
      last_updated: Date.now(),
    }
  }
}
</script>
<style scoped>
</style>