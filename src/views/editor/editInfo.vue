<template>
  <v-container>
    <!-- input area -->
    <v-row>
      <v-col cols="9">
        <v-card>
          <table-form :fields="fields" v-model="value">
            <template #header>
              <thead>
                <tr>
                  <th>Service info</th>
                </tr>
              </thead>
            </template>
          </table-form>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card>
          <v-card-title>APIDoc Editor</v-card-title>
          <v-card-text>
            Lorem Ipsum
            Enjoy!
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import fields from '@/fields'
import Service from '@/models/service'
import tableForm from '@/components/forms/tableForm.vue'

const fields = [
  {key: 'title', label: 'title', desc: 'title' },
  {key: 'version', label: 'version', desc: 'version' },
  {key: 'license', label: 'license', desc: 'license' },
  {key: 'contributors', label: 'contributors', desc: 'contributors', multi: true, },
  {key: 'links', label: 'links', desc: 'links', multi: true },
]

export default {
  name: 'editInfo',
  components: {
    // baseForm,
    // descText,
    // inputPreset,
    tableForm,
  },
  props: {
    modelValue: {
      type: Service,
      required: true,
    }
  },
  data() {
    return {
      fields,
      value: this.modelValue,
    }
  }
}
</script>