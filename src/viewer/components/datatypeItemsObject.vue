<template>
  <v-table v-bind="$thx.table" class="rounded-lg" style="min-width: 30vw;">
    <thead>
      <tr>
        <td colspan="2">
          <v-label>{{ label }}</v-label><br />
          <v-chip>{</v-chip>
        </td>
        <td style="text-align: right">
          <v-btn icon flat size="small" @click="()=>{expand_all = !expand_all}">
            <v-icon>{{ $thx.expanding_icon(expand_all) }}</v-icon>
          </v-btn>
        </td>
      </tr>
    </thead>
    <tbody density="compact">
      <!-- type object -->
      <template v-for="it,ii in datatype.items" :key="`dt-itme.${it.datatype}x${ii}`">
        <tr @click="expanded[it.key] = !expanded[it.key]">
          <th>
            <v-icon size="small" title="required">{{ it.required ? 'mdi-exclamation' : 'mdi-blank' }}</v-icon>
            {{ it.key }}:
          </th>
          <td>
            <v-breadcrumbs :items="inheritance(it.datatype)" class="pa-0" />
          </td>
          <td>
            <v-text-field :model-value="summary_of(it.datatype)" v-bind="$thx.field"
            single-line hide-details placeholder="summary" readonly
            :append-icon="$thx.expanding_icon(expanded[it.key])"
            min-width="5vw" />
          </td>
        </tr>
        <tr v-show="expanded[it.key]">
          <td colspan="3">
            <mark-down :model-value="it.desc" />
          </td>
        </tr>
      </template>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="3">
          <v-chip>}</v-chip>
        </td>
      </tr>
    </tfoot>
  </v-table>
</template>
<script>
import Datatype from '@/models/datatype';
export default {
  name: 'datatypeItems',
  methods: {
    inheritance(tp) {
      return Datatype.typeprop(tp, 'inherits');
    },
    summary_of(tp) {
      return Datatype.typeprop(tp, 'summary')
    },
  },
  props: {
    datatype: Datatype,
    label: {type: String, required: false, default: 'items' },
  },
  computed: {
    expand_all: {
      get() {
        return Object.values(this.expanded).every((v)=>v==true);
      },
      set(v) {
        this.expanded = Object.fromEntries(this.datatype.items.map((it)=>[it.key, v]));
      }    
    },

  },
  mounted() {
    console.log('items', this.datatype.name, this.datatype.items);
  },
  data() {
    return {
      expanded: {},
    };
  }
}
</script>