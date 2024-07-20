<template>
  <v-navigation-drawer class="fill-height pa-0"
    order="1"
    loctaion="left" :model-value="show" permanent>
    <div class="">
      <v-list-subheader>datatypes</v-list-subheader>
      <v-list-item class="pa-0" color="default">
        <v-text-field v-model="search_query" 
          v-bind="$thx.field"
          label="search & create"
          placeholder="regexp"
          hide-details solo
          append-inner-icon="mdi-plus-circle" clearable
          prepend-inner-icon="mdi-magnify"
          @click.stop
          @click:append-inner="create_search"
          @keyup.ctrl.enter="create_search" />
      </v-list-item>
      <v-divider />
    </div>
    <v-list
      class="h-75 overflow-auto"
      :color="$thx.color.datatype"
      @click.stop="selection=[]"
      @update:selected="$emit('selected')"
      multiple selectable slim>    
      <template v-for="origin,oi in origins" :key="`nav-left-datatype-${origin}.${oi}`">
        <v-divider v-if="oi!=0" />
        <v-list-subheader v-show="0<items[origin].length"
          @click.stop>{{ origin }}</v-list-subheader>
        <template v-for="item,ii in items[origin]" :key="`nav-left.${origin}-${item.name}.${ii}`">
          <datatype-tool-card :modelValue="item" location="right">
            <template #default="{ props }">
              <v-list-item v-bind="props"
                @click.stop="($ev)=>select($ev, item.name)"
                :active="selection.includes(item.name)"
                :title="item.name" :value="item.name" />
            </template>
          </datatype-tool-card>
        </template>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// import Datatype from '@/models/datatype';
import datatypeToolCard from '@/components/datatypeToolCard.vue';
import { mapActions, mapState, mapWritableState } from 'pinia';
import { useDatatypeStore } from '@/stores/datatype';


export default {
  name: 'datatypeTab',
  components: {
    datatypeToolCard,
  },
  methods: {
    init() {
    },
    // selecting(ev, it) {
    //   this.select
    //   if(ev.ctrlKey) {
    //     // multiselect: select toggle
    //     this.selection
    //       = this.selection.includes(it)
    //         ? this.selection.filter((v)=>v!==it)
    //         : [...this.selection, it];
    //   } else {
    //     // single select: change the selection item
    //     this.selection = [it];
    //   }
    //   this.$emit('update:model-value', this.selection);
    // },
    ...mapActions(useDatatypeStore, [
      'select','create_search'
    ]),
  },
  props: {
    show: {
      type: Boolean,
      required: false,
      default: ()=>true,
    },
  },
  computed: {
    ...mapState(useDatatypeStore, [
      'types',
      'origins',
      'items',
      'search_pattern',
    ]),
    ...mapWritableState(useDatatypeStore, [
      'project',
      'selection',
      'search_query',
    ]),
  },
  data() {
    return {
      value: this.modelValue,
      open_groups: ['object','enum'],
    }
  },
}
</script>