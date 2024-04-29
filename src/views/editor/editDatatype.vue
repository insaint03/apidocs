<template>
  <v-card>
    <v-toolbar flat density="compact">
      <v-toolbar-title>
        {{ value.name || '_new_parameter' }}
        <v-chip>{{ value.basistype || 'unselected' }}</v-chip>
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn icon @click="$emit('save', value)">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-row>
      <v-col>
        <!-- parameter form -->
        <base-form v-model="value" :fields="fields.parameters">
          <template #item-items>
            <v-divider v-if="!value.is_collective" />
            <list-values v-else-if="value.is_object" v-model="value.items" :fields="fields.items" />
            <parameter-picker v-else-if="value.is_array" v-model="value.items" />
          </template>
        </base-form>
      </v-col>
      <v-col>
        <!-- parameter descriptives -->
        <base-form v-model="value" :fields="fields.parameter_desc">
        </base-form>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <list-values label="samples" v-model="value.samples" :fields="value.items || [{key: 'key'}]"
          itemId="key" itemTitle="key" />
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import Parameter from '@/models/parameter';
import fields from '@/fields';

import parameterPicker from '@/components/inputFields/parameterPicker.vue';
import baseForm from '@/components/forms/baseForm.vue';
// import tableValues from '@/components/inputFields/tableValues.vue';
import listValues from '@/components/inputFields/listValues.vue';

export default {
  name: 'editDatatype',
  components: {
    baseForm,
    // tableValues,
    listValues,
    parameterPicker,
  },
  props: {
    modelValue: {
      type: Parameter,
      required: true,
    },
    disables: {
      type: Array,
      required: false,
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