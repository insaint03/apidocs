<template>
  <!-- on has selection -->
  <v-card v-if="has_select">
    <v-toolbar flat density="compact">
      <v-toolbar-title>
        {{ value.name || '_new_parameter' }}
        <v-chip>{{ value.origintype || 'unselected' }}</v-chip>
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
    <v-row v-if="singular">
      <v-col>
        <list-values label="samples" v-model="value.samples" :fields="value.items || [{ key: 'key' }]" itemId="key"
          itemTitle="key" />
      </v-col>
    </v-row>
  </v-card>
  <!-- on empty selection, create new -->
  <v-card v-else>
    <v-toolbar flat>
      <v-toolbar-title>bulk generator</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-row>
      <v-col>
        <parameter-picker v-model="basis_new" label="common_basis" />
      </v-col>
      <v-col>
        <v-textarea v-model="bulk_names" label="names" hint="delimited by space, newlines" />
      </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn @click="create_bulk">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import Parameter from '@/models/parameter';
import fields from '@/fields';

import parameterPicker from '@/components/inputFields/parameterPicker.vue';
import baseForm from '@/components/forms/baseForm.vue';
// import tableValues from '@/components/inputFields/tableValues.vue';
import listValues from '@/components/inputFields/listValues.vue';

import { mapWritableState} from 'pinia';
import { useServiceStore } from '@/stores/service';

const names_delim = /\s+/;

export default {
  name: 'editDatatype',
  components: {
    baseForm,
    // tableValues,
    listValues,
    parameterPicker,
  },
  methods: {
    create_bulk() {
      let generateds = this.names_new
        .filter((n)=>n.trim().length > 0)
        .map((name) => Parameter.create(name, this.basis_new));
      this.parameters = this.parameters.concat(generateds);
    }
  },
  props: {
    modelValue: {
      type: Parameter,
      required: true,
    },
    disables: {
      type: Array,
      required: false,
    },
    singular: {
      type: Boolean,
      required: false,
    }
  },
  computed: {
    has_select: function () {
      return this.modelValue != null
        && this.modelValue.name != null
        && this.modelValue.basistype != null;
    },
    bulk_names: {
      get() { return this.names_new.map((n)=>n.trim()).join('\n'); },
      set(v) { this.names_new = v.split(names_delim).filter((n)=>n.trim()); }
    },
    ...mapWritableState(useServiceStore, ['parameters']),
  },
  data() {
    return {
      fields,
      value: this.modelValue,
      basis_new: 'string',
      names_new: [],
    }
  }
}
</script>