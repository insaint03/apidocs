<template>
  <toggle-text v-model="value" text="export migration">
    <template #field="{clear}">
      <v-text-field v-model="value"
        prepend-inner-icon="mdi-close" @click:prepend-inner="clear" 
        append-icon="mdi-export" @click:append="exports"
        @change="()=>$emit('change', ...arugments)" 
      />
    </template>
  </toggle-text>
</template>
<script>
import toggleText from '@/components/inputFields/toggleText.vue';

export default {
  name: 'migrationText',
  components: {
    toggleText,
  },
  methods: {
    exports() {
    },
  },
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      binds: {
        inputProps: {

        },
        fieldProps: {

        },
      },
      value: this.modelValue,
    }
  }
}

</script>

