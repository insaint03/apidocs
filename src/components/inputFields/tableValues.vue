<template>
  <v-table density="compact">
    <template #top>
      
    </template>
    <thead>
      <tr>
        <th v-for="(f,hi) in fields" :key="`header-${f.key}.${hi}`">
          {{ f.title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, ri) in values" :key="`row-${ri}`">
        <td v-for="(f,fi) in fields" :key="`cell-${f.key}-${ri}.${fi}`">
          <component v-model="row[f.key]" v-bind="f" :is="f.is || 'v-text-field'" hide-details density="compact" single-line />
        </td>
      </tr>
    </tbody>
    <tfoot>
      <!-- search and/or editing -->
    </tfoot>
  </v-table>
</template>

<script>
export default {
  name: 'tableValues',
  props: {
    fields: { type: Array, required: true, },
    modelValue: { type: Array, required: true, },
  },
  data() {
    return {
      values: this.modelValue || [],
    }
  }
}
</script>