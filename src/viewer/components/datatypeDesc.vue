<template>
  <div>
    <mark-down :model-value="datatype.desc" />
  </div>
  <div>
    <v-label>types</v-label>
    <v-breadcrumbs :items="datatype.inherits" />
  </div>
  <div v-for="fld,fi in fields" :key="`datatype-field.${fld}.${fi}`">
    <v-text-field v-bind="$thx.field" :label="fld" 
      :model-value="datatype[fld]"
      :disabled="!datatype[fld]" />
  </div>
</template>
<script>
const fields = [
  'validation',
  'defaults',
  'migration',
]
export default {
  name: 'datatypeDesc',
  props: {
    datatype: Object,
  },
  data() {
    return {
      fields,
    };
  }
}
</script>