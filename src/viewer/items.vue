<template>
  <v-list>
    <v-list-subheader>{{ label }}</v-list-subheader>
    <v-list-item v-for="(it,ii) in items" :key="`view-item.${it.id || ii}`"
      :title="it.title" :subtitle="it.subtitle">
      <!-- icon -->
      <template #prepend v-if="iconMap">
        <v-icon v-if="it.icon">{{ iconMap[it.icon] || it.icon  }}</v-icon>
      </template>
      <template #append v-if="it.links">
        <v-btn icon flat @click.prevent="pop_or_stop(it)">
          <v-icon>mdi-chevron-right</v-icon>
          <!-- multiple links indicates menu-->
          <v-menu v-if="1<it.links.length" activator="parent">
            <v-list>
              <v-list-item v-for="ln in it.links" :key="`view-item.${it.id || ii}.${ln.href}`"
                :title="ln.anchor || ln.href" @click="popover(ln.href)" />
            </v-list>
          </v-menu>
        </v-btn>
      </template>
    </v-list-item>
  </v-list>
  <v-divider />
</template>
<script>
export default {
  name: 'viewItems',
  methods: {
    pop_or_stop(it) {
      if(it.links.length<=1 && it.links[0].href) {
        this.popover(it.links[0].href);
      } 
    },
    popover(href) {
      window.open(href, '_blank');
    }
  },
  props: {
    modelValue: [Array, Object],
    label: String,
    itemId: String,
    itemTitle: String,
    itemSubtitle: String,
    itemLinks: String,
    itemIcon: String,
    iconMap: Object,
    variant: String,
  },
  computed: {
    items() {
      return (Array.isArray(this.modelValue) ? this.modelValue : [this.modelValue])
        .map((it)=>({
          id: it[this.itemId || 'id'],
          title: it[this.itemTitle || 'title'],
          subtitle: it[this.itemSubtitle || 'subtitle'],
          links: it[this.itemLinks || 'links'].filter((ln)=>ln.href),
          icon: it[this.itemIcon || 'icon'],
        }));
    }
  },
  data() {
    return {  
      value: Array.isArray(this.modelValue) ? this.modelValue : [this.modelValue],
    };
  }
}
</script>