<template>
  <v-form>
    <v-row class="ma-0 pa-0">
      <slot :item="value">
        <v-col class="ma-0 pa-0" v-for="(f,fi) in fields" :key="`field-${f.key}.${fi}`" :cols="f.cols || 12">
          <slot :name="`item-${f.key}`" :item="value">
            <component v-model="value[f.key]" v-bind="f" :is="f.is || 'v-text-field'" 
              hide-details density="compact" single-line />
          </slot>
        </v-col> 
      </slot>
    </v-row>
  </v-form>
</template>

<script>
import parameterPicker from '@/components/parameterPicker.vue';
export default {
  name: 'baseForm',
  components: {
    parameterPicker,
  },
  props: {
    fields: {
      type: Array,
      required: false,
      default: () => [],
    },
    modelValue: {
      type: Object,
      required: true,
      default: () => ({}),
    }
  },
  data() {
    return {
      value: this.modelValue,
    }
  }
}
</script>