<template>
  <v-container fluid>
    <v-row>
      <!-- left service info -->
      <v-col>
        <v-card>
          <v-card-item>
            <v-card-title>Service info</v-card-title>
          </v-card-item>
          <v-card-text>
            <base-form v-model="value" :fields="fields" />
          </v-card-text>
        </v-card>
      </v-col>
      <!-- right service description -->
      <v-col>
        <v-sheet class="fill-height">
          <v-textarea v-model="value.description" label="Description" outlined rows="10" />
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import fields from '@/fields'
import Service from '@/models/service'
import baseForm from '@/components/forms/baseForm.vue'

export default {
  name: 'editInfo',
  components: {
    baseForm,
  },
  props: {
    modelValue: {
      type: Service,
      required: true,
    }
  },
  data() {
    return {
      fields: fields.service.filter((f)=>!/description/i.test(f.key)),
      value: this.modelValue,
    }
  }
}
</script>