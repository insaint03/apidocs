<template>
  <v-table style="background-color: transparent;">
    <tbody>
      <template v-for="(it,ii) in items" :key="`vitem.${it.key || ii}`">
        <tr >
          <td><v-icon v-show="it.required">mdi-asterisk</v-icon></td>
          <th>{{ it.key }}</th>
          <td><v-chip>{{ it.origin }}</v-chip></td>
          <td>{{ it.title }}</td>
          <td>
            <v-icon @click="toggle_expand(it)">{{ expanding_icon(expended[it.key]) }}</v-icon>
          </td>
        </tr>
        <tr v-show="expended[it.key]">
          <!-- nested view -->
          <td colspan="5">
            <!-- type description -->
            <v-sheet>{{ it.misc }}</v-sheet>
            <!-- TODO: treeview over item components -->
            <!-- TODO: examples -->
          </td>
        </tr>
      </template>
    </tbody>
  </v-table>
</template>
<script>
import theme from '@/theme';
import Datatype from '@/models/datatype';
export default {
  name: 'viewItems',
  methods: {
    pop_or_stop(it) {
      if(it.links.length<=1 && it.links[0].href) {
        this.popover(it.links[0].href);
      } 
    },
    popover(href) {
      window.open(href, '_blank');
    },
    toggle_expand(it) {
      this.expended[it.key] = !this.expended[it.key];
    },
    expanding_icon: theme.expanding_icon,
  },
  props: {
    modelValue: [Array, Object],
  },
  computed: {
    items() {
      return this.value.map((it)=>{
        const basis = Datatype.find(it.datatype, true);
        return {
          ...it,
          basis: basis,
          origin: basis.basistype || basis.origintype,
          title: basis.summary,
          misc: basis.description,
          expandable: basis.is_collective,
        }
      })
    }
  },
  data() {
    return {  
      expended: {},
      value: Array.isArray(this.modelValue) ? this.modelValue : [this.modelValue],
    };
  }
}
</script>