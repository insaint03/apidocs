<template>
  <v-table v-bind="$thx.table">
    <thead>
      <tr>
        <td>
          <v-label>{{ label }}</v-label><br />
          enumeration <v-chip>&lt;</v-chip>
        </td>
        <td style="text-align: right">
          <v-btn icon flat size="small" @click="()=>{expand_all = !expand_all}">
            <v-icon>{{ $thx.expanding_icon(expand_all) }}</v-icon>
          </v-btn>
        </td>
      </tr>
    </thead>
    <tbody>
      <template v-for="it,ii in datatype.item_items" :key="`dt-item.${it}x${ii}`">
        <tr @click="expanded[it] = !expanded[it]">
          <th>
            - {{ it.key }}
          </th>
          <td>
            <v-text-field :model-value="summary_of(it)" v-bind="$thx.field"
            single-line hide-details placeholder="summary" readonly
            :append-icon="$thx.expanding_icon(expanded[it.key])"
            min-width="5vw" />
          </td>
        </tr>
        <tr v-show="expanded[it.key]">
          <td colspan="2">
            <!-- TODO: fill in -->
          </td>
        </tr>
      </template>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="2">
          <v-chip>&gt;</v-chip>
        </td>
      </tr>
    </tfoot>
  </v-table>
</template>
<script>
import Datatype from '@/models/datatype';
export default {
  name: 'datatypeItemsArray',
  methods: {
    typeprop(name, key, defaults) {
      const dt = Datatype.find(name);
      return dt ? dt[key] : (defaults || null);
    },
    inheritance(tp) {
      return this.typeprop(tp, 'inherits', []);
    },
    summary_of(tp) {
      return this.typeprop(tp, 'summary', '');
    }
  },
  props: {
    datatype: Object,
    label: {type: String, required: false, default: 'items' },
  },
  computed: {
    expand_all: {
      get() {
        return this.datatype.items.reduce((agg, it)=>agg && this.expanded[it.key], true);
      },
      set(v) {
        this.expanded = Object.fromEntries(this.datatype.items.map((it)=>[it.key, v]));
      }    
    },
  },
  data() {
    return {
      expanded: {},
    };
  },
};
</script>