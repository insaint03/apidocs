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
import Patterns from '@/models/patterns';

const hints = {
  array: '# single name of datatype (i.e. "string")',
  enum: '# value (space) description. will split at left-most space.',
  object: '# !key:datatype=defaults',
}

export default {
  name: 'itemsField',
  methods: {
    update(ev) {
      this.texts = ev.target.value;
      // console.log('update invoked', arguments);
      // this.$emit('update:modelValue', Datatype.parse_items(this.origintype, this.texts));
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
    hint() {
      return hints[this.origintype];
    },
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
      },
      set(value) {
        const tokens = value.split('\n')
          .map((ln)=>ln.trim())
          .filter((ln)=>ln.length>0);
        let values = null;
        // when object items, convert primitive type as new
        if(this.origintype==='object') {
          values = tokens.map(Patterns.item_parse)
            .map((it)=>{
              const dtype = Datatype.find(it.datatype);
              if(!dtype || dtype.is_primitive) {
                const newtype = Datatype.create(`${this.datatype.name}._${it.key}`, it.datatype);
                return {
                  ...it,
                  datatype: newtype.name,
                };
              } else {
                return it;
              }
            });
        } 
        // or simply use Datatype.parse_items
        else {
          values = Datatype.parse_items(this.origintype, ...tokens)
        }

        // console.log('text updated', values);
        this.$emit('update:modelValue', values);

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