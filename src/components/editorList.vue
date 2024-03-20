<template>
  <v-list>
    <template v-for="(it, ii) in modelValue" :key="`${title}-${it.name}.${ii}`">
      <slot name="item" :item="it" :index="ii">
        <v-tooltip>
          <template #activator="{props}">
            <v-list-item slim v-bind="props" @click="onclick(it)">
              <slot name="item-content">
                <v-list-item-title>{{ it.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ it.basistype }}</v-list-item-subtitle>
              </slot>
            </v-list-item>
          </template>
          <slot name="item-tooltip" :item="it" :index="ii">
          </slot>
        </v-tooltip>
      </slot>
    </template>
  </v-list>
</template>

<script>
export default {
  name: 'editorList',
  props: {
    title: {
      type: String,
      required: false,
      default: ()=>'list',
    },
    select: {
      type: Object,
      required: false,
    },
    modelValue: {
      type: Array,
      required: true,
      default: ()=>[],
    },
  },
  methods: {
    onclick(it) {
      this.$emit('select', it);
    }
  },
  data() {
    return {
      value: this.modelValue,
    }
  }
}
</script>