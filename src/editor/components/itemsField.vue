<template>
  <v-textarea v-model="texts"
    :label="$props.label || 'properties'"
    :name="$props.name || 'items'"
    v-bind="$thx.field"
    @focus="focused=true" @blur="changes"
  />
  <div v-show="focused">
    <v-divider>preview</v-divider>
    <v-list>
      <v-list-item v-for="(it,ii) in items" :key="`items-field.${ii}`"
        :prepend-icon="it.icon">
        <v-list-item-title>
          {{ it.name }} 
          &nbsp;<v-chip size="small" v-if="it.inherits">{{ it.inherits.join(' / ') }}</v-chip>
        </v-list-item-title>
        <v-list-item-subtitle v-show="it.summary">
          //{{ it.summary }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>


  </div>

</template>
<script>
import Datatype from '@/models/datatype';

// import itemsObjectField from './itemsObjectField.vue';

import { mapActions, mapState, mapWritableState } from 'pinia';
import { useDatatypeStore } from '@/stores/datatype';

const parsed_map = {
  object(v){
    const t = Datatype.find(v.datatype);
    return  t ? {
      icon: v.required ? 'mdi-exclamation' : 'mdi-blank',
      name: v.key,
      inherits: t.inherits || [v.datatype],
      summary: t.summary,
    } : {
      name: v.key,
    }
  },
  array(v){
    const t= Datatype.find(v);
    return {
      name: t.name,
      inherits: t.inherits,
      summary: t.summary,
    }
  },
  enum: (v)=>{
    return {
      name: v.value,
      summary: v.desc,
    }
  },
};

export default {
  name: 'itemsField',
  components: {
    // itemsObjectField,
  },
  emits: ['update:modelValue', 'change'],
  watch: {
    values() {
      this.texts = this.parse();
    },
  },
  beforeUpdate() {
    if(!this.focused && this.values && this.values.items) {
      this.texts = this.parse(this.values.items);
    }
    // this.texts = this.value_texts;
  },
  methods: {
    changes() {
      // const text = $ev.target.value;
      console.log('try to update', this.texts);
      this.$emit('change', this.texts);
      this.focused = false;
    },
    parse(items) {
      return Datatype.serialize_items(this.origintype, ...(items || this.values.items));

    },
    add_item(val) {
      if(this.is_array) {
        const value = this.items.concat(this.findtype(val));
        this.update_values(value);
        // clear selection
        this.puts.datatype = null;

      } else if(this.is_enum) {
        const value = {
          value: this.puts.value,
          desc: this.puts.desc,
        };
        this.update_values(value);
      }
    },
    ...mapActions(useDatatypeStore, [
      'findtype',
      'updates',
    ]),
  },
  props: {
    // datatype: Object,
    name: String,
    modelValue: Array,
    label: String,
    disabled: Boolean,
  },
  computed: {
    basis() {
      return this.values.basistype !=null
        ? Datatype.find(this.values.basistype)
        : null;
    },
    origintype() {
      return this.values.origintype;
    },
    is_object() {
      return this.origintype === 'object';
    },
    is_array() {
      return this.origintype === 'array';
    },
    is_enum() {
      return this.origintype === 'enum';
    },
    columns() {
      switch(this.origintype) {
        case 'array':
          return ['name', 'basistype', 'origintype', 'summary' ];
        case 'object':
          return ['key', 'datatype', 'defaults', 'summary'];
        case 'enum':
          return ['value', 'desc'];
      }
      return [];
    },
    items() {
      return Datatype.parse_items(this.origintype, ...(this.texts||'').split('\n'))
        .map(parsed_map[this.origintype]);
    },
    ...mapWritableState(useDatatypeStore, [
      'datatypes',
    ]),
    ...mapState(useDatatypeStore, [
      // 'value_texts',
      'values',
      'alltypes',
    ]),
  },
  data() {
    return {
      focused: false,
      texts: '',
      // value: this.modelValue,
      raw_mode: false, 
      autopush: false,
      puts: {},
    };
  },
  mounted() {
  }
}

/** legacy templates 
 * <items-object-field v-if="is_object" :label="label" :disabled="disabled" />
  <div v-else class="d-flex flex-fill flex-wrap justify-space-evenly">
    <!-- editor mode -->
    <v-list theme="dark" class="flex-fill">
      <v-list-subheader>items</v-list-subheader>
      <v-list-item 
        class="border-t-thin"
        v-for="(it,ii) in items" :key="`datatype-item-${ii}`"
        prepend-icon="mdi-package">
        <template v-if="is_array">
          <v-list-item-title>
            <v-chip>{{ basis_prop(it).join(' / ') }}</v-chip>
          </v-list-item-title>
          <v-list-item-subtitle>
            // {{ summary_prop(it) }}
          </v-list-item-subtitle>
        </template>
        <template v-else-if="is_enum">
          <v-list-item-title>{{ it.value }}</v-list-item-title>
          <v-list-item-subtitle>{{ it.desc }}</v-list-item-subtitle>
        </template>
        <template #append>
          <v-btn icon flat @click="items.splice(ii,1)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-list-item>
      <v-divider />
      <!-- adding fields item -->
      <v-list-item>
        <v-autocomplete v-if="is_array" v-bind="$thx.field"
          single-line auto-select-first item-title="name" item-value="name"
          :items="alltypes"
          v-model="puts.datatype"
          @change="add_item(puts.datatype)" />
        <div v-else-if="is_enum" class="d-flex flex-fill justify-between">
          <v-text-field v-model="puts.value" label="value" v-bind="$thx.field" />
          <v-text-field v-model="puts.desc" label="desc" v-bind="$thx.field" />
        </div>
      </v-list-item>
    </v-list>
    <!-- raw mode -->
    <div class="flex-fill pa-1">
      <v-textarea :model-value="texts" :disabled="disabled" v-bind="$thx.field"
        @change="($ev)=>texts=$ev.target.value" />
    </div>
  </div>
*/
</script>
<style scoped>
.item-key {
  white-space: nowrap;
  width: 10%;
}
.item-datatype {
  white-space: nowrap;
  width: 10%;
}
.item-summary {
  font-style: oblique;;
  width: 85%;
}
.item-defaults {
  white-space: nowrap;
  width: 10%;
}
.item-action {
  white-space: nowrap;
  width: 5%;
}
</style>