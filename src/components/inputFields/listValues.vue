<template>
  <v-list :key="`items.${value.length}`">
    <template v-if="label">
      <v-list-item-subheader @click="modal">{{ label }}</v-list-item-subheader>
      <v-divider />
    </template>
    <!-- -->
    <v-list-item v-for="it, ii in value" :key="`list-values.${it[itemId]}-${ii}`" @click="modal(it)"
      append-icon="mdi-dots-vertical">
      <v-list-item-title>{{ it[itemTitle] }}</v-list-item-title>
      <v-list-item-subtitle>{{ it[itemSubtitle] || '-' }}</v-list-item-subtitle>
    </v-list-item>
    <v-divider />
    <v-list-item @click="modal()" subtitle="new" prepend-icon="mdi-plus">
    </v-list-item>
  </v-list>
  <v-dialog v-model="dialog_show">
    <v-card v-if="item">
      <v-card-items @click="cancel">
        <v-card-title>{{ item[itemTitle] || `new ${label}` }}</v-card-title>
        <v-card-subtitle>{{ item[itemSubtitle] || '' }}</v-card-subtitle>
      </v-card-items>
      <v-card-text>
        <v-form>
          <component v-for="(f, fi) in fields" :key="`list-values.dlg.${fi}`" v-model="item[f.key || f]" v-bind="f"
            :is="f.is || 'v-text-field'" />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="remove(item)"><v-icon>mdi-delete</v-icon>Remove</v-btn>
        <v-spacer />
        <v-btn text @click="cancel">Cancel</v-btn>
        <v-btn text @click="save"><v-icon>mdi-content-save</v-icon>Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>

export default {
  name: 'list-values',
  components: {
  },
  methods: {
    modal(v) {
      if (v) {
        this.item = v;
      } else {
        this.dialog_show = true;
      }
    },
    remove(item) {
      this.value = this.value.filter((it)=>it !== item);
      this.$emit('update:modelValue', this.value);
      this.item = null;
    },
    cancel() {
      this.item = null;
    },
    save() {
      console.log('on save', this.item, this.value);
      this.value = this.value.concat([Object.assign({}, this.item)]);
      console.log(this.value);
      this.$emit('update:modelValue', this.value);
      this.item = null;
    },
  },
  props: {
    modelValue: {
      type: Array,
      required: true,
    },
    fields: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      required: false,
    },
    itemId: {
      type: String,
      required: false,
      default: 'id',
    },
    itemTitle: {
      type: String,
      required: false,
      default: 'title',
    },
    itemSubtitle: {
      type: String,
      required: false,
      default: 'subtitle',
    },
    itemDefaults: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  computed: {
    dialog_show: {
      get() {
        return this.item !== null;
      },
      set(v) {
        this.item = v ? Object.assign({}, this.itemDefaults) : null;
      }
    },
  },
  data() {
    return {
      item: null,
      value: this.modelValue,
    };
  }
}
</script>