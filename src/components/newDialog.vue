<template>
  <v-dialog v-model="show_dialog">
    <v-card @keyup.enter="submit">
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text v-if="value">
        <!-- default slot here -->
        <base-form v-model="value" :fields="fields" />
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="dispose">CANCEL</v-btn>
        <v-spacer />
        <v-btn text @click="submit">SUBMIT</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import baseForm from '@/components/forms/baseForm.vue';

export default {
  name: 'newDialog',
  components: {
    baseForm,
  },
  props: {
    title: {
      type: String,
      required: false,
      default: (()=>'Dialog'),
    },
    show: {
      type: Boolean,
      required: false,
      default: ()=>false,
    },
    fields: {
      type: Array,
      required: false,
    },
    modelValue: {
      type: Object,
    },
  },
  methods: {
    dispose() {
      this.show_dialog = false;
    },
    submit() {
      this.$emit('submit', this.value);
      this.dispose();
    },
  },
  computed: {
    show_dialog: {
      get() {
        return this.value != null;
      },
      set(v) {
        if(!v){
          this.value = null;
          // this.$emit('update:modelValue', null);
        }
      }
    }
  },
  data() {
    return {
      value: this.modelValue,
    }
  }
}
</script>