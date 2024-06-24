<template>
  <v-table>
    <slot name="header">
      <thead></thead>
    </slot>
    <tbody>
      <template v-for="field, fi in fields" :key="`tbl-field.${fi}-${field.key}`">
        <tr>
          <th>{{ field.key }}</th>
          <td>
            <!-- multiline -->
            <v-textarea v-if="field.type=='area'" v-bind="$thx.field" v-model="value[field.key]" />
            <!-- markdown -->
            <v-tooltip v-else-if="field.type=='markdown'" v-bind="$thx.field">
              <template #activator="{ props }">
                <v-text-field v-model="value[field.key]" v-bind="{...props, ...$thx.field}" />
              </template>
              <v-sheet>
                <mark-down v-model="value[field.key]" />
              </v-sheet>
            </v-tooltip>
            <!-- liners -->
            <!-- datatype -->
            <!-- defaults -->
            <v-text-field v-else v-model="value[field.key]" v-bind="$thx.field" />
          </td>
        </tr>
      </template>
    </tbody>

  </v-table>
</template>
<script>
export default {
  name: 'tableFields',
  props: {
    fields: Array,
    modelValue: Object,
  },
  data() {
    return {
      value: this.modelValue,
    };
  }
}
</script>