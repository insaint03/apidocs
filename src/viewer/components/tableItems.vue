<template>
  <v-table v-if="items && 0<items.length" class="rounded my-2">
    <thead>
      <tr>
        <td colspan="3">
          <v-label>{{ label }}</v-label>
        </td>
      </tr>
    </thead>
    <tbody>
      <template v-for="(item, row) in items" :key="`tv-${row}`">
        <tr class="border-b-thin">
          <th>{{ item.key }}</th>
          <td><v-breadcrumbs :items="typeprop(item.datatype, 'inherits')" /></td>
          <td>
            <v-text-field :model-value="typeprop(item.datatype, 'summary')" v-bind="$thx.field"
              single-line hide-details readonly />
          </td>
        </tr>
      </template>
    </tbody>
  </v-table>
</template>
<script>
import Datatype from '@/models/datatype';

export default {
  name: 'tableItemsView',
  methods: {
    typeprop(name, key) {
      const dt = Datatype.find(name, false);
      return dt ? dt[key] :null;
    },

  },
  props: {
    items: Array,
    label: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
    };
  }
}
</script>