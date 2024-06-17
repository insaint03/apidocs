<template>
  <v-card v-bind="cardProps" flat>
    <v-toolbar @click="toggle_open" style="background: inherit; color: inherit;">
      <v-toolbar-title v-if="title || icon">
        <v-icon v-if="icon">{{ icon }}</v-icon>
        {{ title || '' }}
      </v-toolbar-title>
      <v-spacer />
      <slot name="toolbar-sub"></slot>
      <slot name="toolbar-items">
        <v-toolbar-items v-if="showToolMore">
          <v-btn v-for="mm,mi in mores" :key="`cc-tool-${mm}.mi`"
            text flat
            @click.stop="toggle_more(mi)"
            :active="show_mores[mi]">
            {{ mm }}
          </v-btn>
          <v-btn icon>
            <v-icon>{{ $thx.expanding_icon(open) }}</v-icon>
          </v-btn>
        </v-toolbar-items>
      </slot>
    </v-toolbar>
    <slot name="card-fixed" :open="open" :mores="mores" :show_mores="show_mores">

    </slot>
    <template v-if="open">
      <v-card-item>
        <slot name="card-items">
          <v-card-title>
            <slot name="card-item-title"></slot>
          </v-card-title>
          <v-card-subtitle>
            <slot name="card-item-subtitle"></slot>
          </v-card-subtitle>
        </slot>
      </v-card-item>
      <v-card-text>
        <slot></slot>
      </v-card-text>
      <v-card-actions v-if="!showToolMore">
          <v-spacer />
          <v-btn v-for="mm,mi in mores" :key="`cc-tool-${mm}.${mi}`"
              text flat
              @click.stop="toggle_more(mi)"
              :active="show_mores[mi]">
              {{ mm }}
            </v-btn>
      </v-card-actions>
      <v-card-actions v-if="actions">
        <slot name="card-actions"></slot>
      </v-card-actions>
      <template v-for="mm,mi in mores" :key="`cc-more-${mm}.${mi}`">
        <v-divider v-show="show_mores[mi]" />
        <v-card-text v-show="show_mores[mi]">
          <slot :name="`more-${mm}`" :more="mm" :index="mi" :open="show_mores[mi]"></slot>
        </v-card-text>
      </template>
    </template>
  </v-card>
</template>
<script>
export default {
  name: 'collapsibleCard',
  methods: {
    toggle_open() {
      // this.open = !this.open;
      this.$emit('update:open', !this.open);
    },
    toggle_more(index) {
      const more = this.mores[index];
      const value = this.show_mores[index] = !this.show_mores[index];
      this.$emit(`update:more-${more}`, value);
    }
  },
  props: {
    cardProps: {
      type: Object,
      default: () => ({})
    },
    open: {
      type: Boolean,
      default: true
    },
    mores: {
      type: Array,
      default: () => []
    },
    showToolMore: {
      type: Boolean,
      default: true
    },
    icon: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
    actions: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show_mores: this.mores.map(() => false),
    };
  }
}

</script>