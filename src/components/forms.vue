<template>
  <v-form>
    <component v-for="fl in fields" :key="fl.key" 
      :is="fl.is || 'v-text-field'"
      :modelValue="modelValue[fl.key]" 
      readonly
      v-bind="{...$thx.field, ...fl,}"
    />
  </v-form>
</template>

<script>
import viewItems from './items.vue';
export default {
  name: 'viewForms',
  components: {
    viewItems,
  },
  methods: {
    //
    
  },
  props: {
    modelValue: Object,
    fields: Array,
  },
  computed: {
  },
  data() {
    return {

    }
  }
}
</script>