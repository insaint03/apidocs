<template>
  <v-form>
    <v-row class="ma-0 pa-0">
      <slot :item="value">
        <v-col class="ma-0 pa-0`" v-for="(f,fi) in fields" :key="`field-${f.key}.${fi}`" :cols="f.cols || 12">
          <slot :name="`item-${f.key}`" :item="value">
            <component 
              v-model="value[f.key]" 
              v-bind="f" :is="f.is || 'v-text-field'" 
              density="compact" :hide-details="readonly" 
              :disabled="disables.includes(f.key)" 
              @change="(ev)=>update_value(f.key, ev.target.value)"/>
          </slot>
        </v-col> 
      </slot>
    </v-row>
  </v-form>
</template>

<script>
import inputFields from '@/components/inputFields'
export default {
  name: 'baseForm',
  components: {
    ...inputFields,
  },
  methods: {
    update_value(key, val) {
      this.$emit('edit', [key, val || this.value[key]]);
      // console.log('value updated', arguments);
      // this.$emit('edit', [key, current_value], old_value);
      // this.$emit('update:model-value', this.value);
    }
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
    },
    readonly: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    disables: {
      type: Array,
      required: false,
      default: ()=>[],
    }
  },
  data() {
    return {
      value: this.modelValue,
    }
  }
}
</script>