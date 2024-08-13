<template>
  <v-card flat>
    <v-card-title>
      <v-label>History Logs</v-label>
    </v-card-title>
    <v-card-text class="d-flex flex-row">
      <v-tabs direction="vertical" v-model="selected" :items="versions" />
      <div class="d-flex flex-column flex-fill">
        <!-- liner view for other -->
        <v-list class="pa-0 rounded-lg" tabindex="-1">
          <liner-list-group v-show="focused" :items="items.items" :icons="$thx.icon.history" />
        </v-list>
        <v-textarea label="logs" v-bind="$thx.field"
          v-show="editable"
          v-model="items.text"
          placeholder="(keytype) title <link1,link2|anchor> and optional longlong description"
          hint="(keytype) title <link> desc; keytype and title are required"
          @blur="append" />
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import Patterns from '@/models/patterns';
// import Project from '@/models/project';
import MultiLiner from '@/models/meta/multiLiner';
import linerListGroup from '@/viewer/components/linerListGroup.vue';

export default {
  name: 'historyField',
  components: {
    linerListGroup,
  },
  methods: {
    append() {
      this.$emit('update:model-value', this.items.text);
      // if(this.value && 0<this.value.trim().length) {
      //   this.project.history_log({
      //     version: this.current_version,
      //     items: this.value,
      //   });
      //   this.value = null;
      //   this.$emit('update:project', this.project);
      // }
    } 
  },
  props: {
    // project: {type:Project, required: true},
    modelValue: {type: Array, required: false},
    version: {type: String, required: false},
    label: {type: String, required: false, default: 'history' },
  },
  computed: {
    editable() {
      return (this.selected == this.version);
    },
    selected_instance() {
      return this.modelValue.find((h)=>h.version==this.selected);
    },
    // selected_items() {
    //   return this.selected_instance 
    //     ? this.selected_instance.items
    //     : new MultiLiner();
    // },
    // selected_log() {
    //   return this.history.find((h)=>h.version==this.selected);
    // },
    // selected_items() {
    //   return (this.selected_log||{items:[]}).items;
    // },
    // selected_date() {
    //   return (this.selected_log||{date:[]}).date;
    // },
    history() {
      return this.modelValue[this.selected] || {
        items: new MultiLiner(),
        date: new Date().toISOString(),
        version: this.selected,
      };
    },
    versions() {
      return [this.version]
        .concat(this.modelValue.map((h)=>h.version))
        // filter unique
        .filter((v,i,a)=>a.indexOf(v)===i)
        .sort().reverse();
    },
    parsed() {
      return this.value.trim()
        ? this.value.split('\n').map(Patterns.liner_parse)
        : [];
    },
  },
  watch: {
    // version(v) {
    //   if(v) {
    //     this.selected = this.version;
    //   }
    // },
    selected_instance(it) {
      if(it && it.items) {
        this.items.value = it.items.value || [];
      } else {
        this.items.value = [];
      }
      // const it = this.selected_instance
    }
  },
  mounted() {
    this.selected = this.version;
  },
  data() {
    return {
      focused: true,
      value: '',
      selected: null,
      items: new MultiLiner(),
    };
  }

}
</script>