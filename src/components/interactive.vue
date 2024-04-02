<template>
  <v-tooltip v-bind="tooltipBinds">
    <template #activator="tooltipProps">
      <v-menu v-model="activate" v-bind="{ ...tooltipProps.props, ...menuBinds }">
        <template #activator="menuProps">
          <slot :props="{...tooltipProps.props, ...menuProps.props, ...binds}">
            <component :is="is" v-bind="{ ...menuProps.props, ...binds }" />
          </slot>
        </template>
        <slot name="menu" :item="item">
          <v-card>
            <v-card-item>
              <v-card-title>
                <slot name="menu-title">Title</slot>
              </v-card-title>
              <slot name="menu-subtitle">
              </slot>
            </v-card-item>
          </v-card>
          <slot name="menu-content">
          </slot>
          <v-card-actions>
            <v-btn text @click="cancel" color="accent">Cancel</v-btn>
            <v-btn text @click="reset" color="warning">Reset</v-btn>
            <v-spacer />
            <v-btn text @click="save" color="primary">OK</v-btn>
          </v-card-actions>
        </slot>
      </v-menu>
    </template>
    <slot name="tooltip">
      <v-sheet>
        <slot name="tooltip-content"></slot>
      </v-sheet>
    </slot>
  </v-tooltip>
</template>

<script>
export default {
  // name: 'interactive',
  methods: {
    cancel() { this.activate = false; },
    reset() { this.model = Object.assign({}, this.modelValue); },
    save() {
      this.$emit('update:modelValue', this.model);
      this.activate = false;
    }
  },
  props: {
    is: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Object,
      required: false,
    },
    binds: {
      type: Object,
      required: false,
    },
    menu: {
      type: Object,
      required: false,
    },
    tooltip: {
      type: Object,
      required: false,
    }
  },
  computed: {
  },
  data() {
    return {
      menuBinds: {
        closeOnContentClick: false,

        ...this.menu,
      },
      tooltipBinds: {
        ...this.tooltip,
      },
      value: Object.assign({}, this.modelValue),
      activate: false,
    }
  }
}

</script>