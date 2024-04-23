<template>
  <v-autocomplete v-model="selected" v-model:search="search" v-bind="binds"
    @keyup.enter.stop="dialog=true">
    <template #prepend-item>
      <v-list-item @click="dialog = true" :title="itemNew" />
      <v-divider />
    </template>
    <template #item="{item}">
      <v-list-item @click="select(item.raw)">
        <v-list-item-title>{{ item.raw[itemTitle] }}</v-list-item-title>
        <v-list-item-subtitle v-if="itemSubtitle">{{ item.raw[itemSubtitle] }}</v-list-item-subtitle>
        <v-list-item-action v-if="itemAction">{{ item.raw[itemAction] }}</v-list-item-action>
      </v-list-item>
    </template>
  </v-autocomplete>
  <v-dialog v-model="dialog">
    <v-card v-if="temp">
      <v-card-title>{{ itemNew }}</v-card-title>
      <v-card-text>
        <v-col class="ma-0 pa-0" v-for="(f,fi) in fields" :key="`list-selector.new.${fi}`">
          <component v-model="temp[f.key || f]" v-bind="f" :is="f.is || 'v-text-field'" />
        </v-col>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="cancel">Cancel</v-btn>
        <v-spacer />
        <v-btn text @click="append(temp)">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
// import baseForm from '@/components/forms/baseForm.vue';
export default {
  name: 'listSelector',
  components: {
    // baseForm,
  },
  methods: {
    append(item) {
      // update items
      this.$emit('update:items', this.items.concat([item]));
      // select the new
      this.select(item);
      // dispose
      this.dialog = false;
    },
    select(item) {
      this.value = item;
      this.search = item[this.itemTitle];
      this.$emit('update:modelValue', this.value);
    },
    cancel() {
      // dispose only
      this.dialog = false;
    },
  },
  props: {
    modelValue: {
      type: Object,
      required: false,
    },
    items: {
      type: Array,
      required: true,
    },
    itemNew: {
      type: String,
      required: false,
      default: 'new item',
    },
    itemTitle: {
      type: String,
      required: false,
      default: 'title',
    },
    itemAction: {
      type: String,
      required: false,
    },
    itemSubtitle: {
      type: String,
      required: false,
      default: 'subtitle',
    },
    itemDefault: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    fields: {
      type: Array,
      required: true,
    },
  },
  computed: {
    dialog: {
      get() {
        return this.temp != null;
      },
      set(v) {
        if (v) {
          // create new
          this.temp = Object.assign({
            [this.itemTitle]: this.search,
          }, this.itemDefault);
        } else {
          this.temp = null;
        }
      }
    },
    selected() {
      return this.value[this.itemTitle];
    }
  },
  data() {
    return {
      value: this.modelValue,
      binds: {
        items: this.items,
        eager: true,
        autoSelectFirst: true,
        clearable: true,
        customFilter: (v,q,it)=>!(q && !Object.entries(it.raw).map((en)=>en.join('=')).join('&').includes(q || this.search)),
      },
      selection: this.modelValue,
      // value: this.modelValue,
      temp: null,
      search: null,

    }
  }
}
</script>