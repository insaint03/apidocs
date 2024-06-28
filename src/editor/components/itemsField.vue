<template>
  <div v-show="modelValue">
    <v-textarea :model-value="texts"
      v-bind="$thx.field"
      :label="label"
      :rules="rules"
      :disabled="disabled"
      @change="update" />
  <!-- only for items allowed types -->
    <v-table v-show="!disabled" theme="dark">
      <thead>
        <tr>
          <th v-for="col,ci in columns" :key="`it-field.column.${ci}`">{{ col }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row,ri in items" :key="`it-field.row.${ri}`">
          <td v-for="col,ci in columns" :key="`it-field.cell.${ri}.${ci}`">
            {{ row[col] }}
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
<script>
import Datatype from '@/models/datatype';
export default {
  name: 'itemsField',
  methods: {
    update() {
      console.log('update invoked', this.texts);
      this.$emit('update:modelValue', Datatype.parse_items(this.origintype, this.texts));
    }
  },
  props: {
    datatype: Object,
    modelValue: Array,
    label: String,
    rules: Array,
    disabled: Boolean,
  },
  computed: {
    basis() {
      return this.datatype.basistype !=null
        ? Datatype.find(this.datatype.basistype)
        : null;
    },
    origintype() {
      return this.datatype.origintype;
    },
    columns() {
      switch(this.origintype) {
        case 'array':
          return ['name', 'basistype', 'origintype', 'summary' ];
        case 'object':
          return ['key', 'datatype', 'defaults', 'summary'];
        case 'enum':
          return ['value', 'desc'];
      }
      return [];
    },
    items() {
      return this.datatype.items;
    },
    texts: {
      get() {
        const origin = this.origintype;
        const items = this.value;
        return (origin && items)
          ? Datatype.serialize_items(this.origintype, ...this.datatype.items)
          : '';
      }
    },
    // texts() { 
    //   const origin = this.origintype;
    //   const items = this.modelValue;
    //   return (origin && items)
    //     ? Datatype.serialize_items(this.origintype, ...this.datatype.items)
    //     : '';
    // },
  },
  data() {
    return {
      value: this.modelValue,
    };
  },
}
</script>