<template>
  <v-list-subheader v-if="label">{{ label }}</v-list-subheader>
  <v-list-item v-for="(item,ii) in items" :key="`liner-${label}.${ii}`"
    :title="item.title" :subtitle="item.description"
    :active="editable">
    <template #prepend>
      <v-btn :title="item.keytype" flat readonly style="background:inherit;color:inherit">
        <v-icon v-if="icons && icons[item.keytype]">{{ icons[item.keytype] }}</v-icon>
        <span v-else>
          {{ (item.keytype || '').substr(0,3).toUpperCase() }}
        </span>
      </v-btn>
    </template>
    <template #append v-if="editable">
      <v-btn icon flat @click="$emit('close', item)" style="background:inherit;color:inherit">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
    <ul v-if="has_links(item)">
      <li v-for="({href,anchor},hi) in item.links" :key="`liner-${ii}.${hi}`">
        <a :href="href" target="_blank">{{ anchor || href }}</a>
      </li>
    </ul>
  </v-list-item>
</template>
<script>
/** props of 
 * keytype,
 * title,
 * links,
 * description
 */
export default {
  name: 'linerListGroup',
  methods: {
    has_links(item) {
      return item.links && 0<item.links.length;
    },
    is_singlular_link(item) {
      return item.links.length<=1;
    },
    open_new({href,}) {
      window.open(href, '_blank');
    }
  },
  props: {
    label: String,
    items: Array,
    icons: { type: Object,required: false },
    editable: { type: Boolean, required: false, default: false },
  },
  computed: {

  },
  data() {
    return {
      open: this.items.map(()=>false),
      value: this.items.filter((t)=>t),
    };
  }
}
</script>