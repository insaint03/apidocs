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
            <template v-for="field in fields" :key="`edit-service.${field}`">
              <input-preset v-model="value[field]" :fieldId="`service.${field}`" :label="field"  />
            </template>
          </v-card-text>
        </v-card>
      </v-col>
      <!-- right service description -->
      <v-col>
        <v-sheet class="fill-height">
          <input-preset v-model="value.description" fieldId="service.description" label="description" />
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import fields from '@/fields'
import Service from '@/models/service'
import inputPreset from '@/components/inputFields/inputPreset.vue'
// import baseForm from '@/components/forms/baseForm.vue'
// import descText from '@/components/inputFields/descText.vue'

export default {
  name: 'editInfo',
  components: {
    // baseForm,
    // descText,
    inputPreset,
  },
  props: {
    modelValue: {
      type: Service,
      required: true,
    }
  },
  data() {
    return {
      fields: [
        'title',
        'version',
        'license',
        'contributors',
        'links',
      ],
      value: this.modelValue,
    }
  }
}
</script>