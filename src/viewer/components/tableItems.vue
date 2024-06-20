<template>
  
  <v-table v-bind="$props">
    <thead>
      <slot name="header">
      <!-- header -->
      <tr>
        <td :colspan="columns.length">
          <v-label>{{ label }}</v-label>
        </td>
      </tr>
      </slot>
    </thead>
    <tbody>
      <v-tooltip v-for="(item, row) in items" :key="`tv-${row}`" :disabled="!tooltip" location="center">
        <template #activator="{ props }">
          <tr v-bind="props">
            <slot name="row-item" :row="row" :item="item" :columns="columns">
              <td v-for="(column, col) in columns" :key="`tv-${row}-${col}`">
                <slot name="`cell-item" :row="row" :col="col" :column="column" :item="item">
                  {{ item[column] }}
                </slot>
              </td>
            </slot>
          </tr>
        </template>
        <slot name="tooltip" :item="item" :columns="columns" :row="row"></slot>
      </v-tooltip>
    </tbody>
  </v-table>
</template>
<script>
export default {
  name: 'tableItemsView',
  props: {
    items: Array,
    columns: Array,
    tooltip: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: ()=>'table' 
    },
  },
  data() {
    return {
    };
  }
}
</script>