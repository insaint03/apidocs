<template>
  <toggle-text v-model="value" text="export migration">
    <template #field="{v, clear}">
      <v-text-field :model-value="v" @update:model-value="(v)=>value=v"
        prepend-inner-icon="mdi-close" @click:prepend-inner="clear" 
        append-icon="mdi-export" @click:append="exports" />
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
      console.log('export migration', this.value);
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

