<template>
  <div class="ma-2 pa-1">
    <v-breadcrumbs :items="datatype.inherits" />
    <mark-down :model-value="datatype.desc" />
    <div v-for="fld,fi in fields" :key="`datatype-field.${fld}.${fi}`">
      <v-text-field v-bind="$thx.field" :label="fld" 
        :model-value="datatype[fld] || ' (unspecified)'"
        :disabled="!datatype[fld]" />
    </div>
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