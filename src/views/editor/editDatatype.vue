<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card>
          <v-card-item>
            <v-card-title>
              Parameter
            </v-card-title>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Parameter from '@/models/parameter';

export default {
  name: 'editDatatype',
  props: {
    modelValue: {
      type: Parameter,
      required: true,
    }
  },
  data() {
    return {
      value: this.modelValue,
    }
  }
}
</script>