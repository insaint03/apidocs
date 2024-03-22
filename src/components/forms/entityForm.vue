<template>
  <form-card>
    <template #title>

    </template>
    <!-- request form -->
    <v-row>
      <v-col>
    <base-form v-model="request" :fields="request_fields">
    </base-form>
      </v-col>
      <v-col>
        <base-form v-model="response" :fields="response_fields">
        </base-form>
      </v-col>
    </v-row>
  </form-card>
</template>

<script>
import {mapWritableState} from 'pinia';
import { useServiceStore } from '@/stores/service';
import { useEditorStore } from '@/stores/editor';


import fields from '@/fields.js' ;
import Request from '@/models/request';
import Response from '@/models/response';

import formCard from '@/components/forms/formCard.vue';
import baseForm from '@/components/forms/baseForm.vue';


export default {
  name: 'entityForm',
  components: {
    formCard,
    baseForm,
  },
  props: {
    modelValue: {
      type: Object,
      required: false,
    },
  },
  computed: {
    ...mapWritableState(useServiceStore, ['requests', 'responses']),
    ...mapWritableState(useEditorStore, ['on_entity']),
  },
  data() {
    return {
      request: (this.modelValue || {}).request || new Request(),
      response: (this.modelValue || {}).response || new Response(),
      request_fields: fields.request,
      response_fields: fields.response,
    }
  }
}
</script>