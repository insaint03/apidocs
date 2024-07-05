<template>
  <v-list>
    <v-list-item v-for="item,ii in tmpls" :key="`list-item.${ii}`"
      :title="item.name" :subtitle="item.tagname"

      append-icon="mdi-close"
      @click="subtract(item.name)" />
    <v-divider />
    <!-- new -->
    <v-list-item>
      <v-autocomplete 
        v-model="newname"
        @update:model-value="add(newname)"
        :items="items"
        prepend-inner-icon="mdi-plus" 
        v-bind="$thx.field"
      />
    </v-list-item>
  </v-list>
</template>
<script>
import Template from '@/models/template';
export default {
  name: 'templateMixList',
  methods: {
    add() {
      // const tmpl = Template.find(this.newname);
      this.$emit('update:model-value', this.modelValue.concat(this.newname));
      this.newname = '';
    },
    subtract(name) {
      this.$emit('update:model-value', this.modelValue.filter(n=>n!=name));
    }
  },
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    }
  },
  computed: {
    tmpls() {
      return Template.finds(...this.modelValue)
        .filter((t)=>t!=null);
    },
    items() {
      return this.all
        .filter((tn)=>!this.modelValue.includes(tn));
    }
  },
  data() {
    return {
      all: Template.names(...Template.all),
      newname: '',
    }
  }
}
</script>