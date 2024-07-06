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
          <liner-list-group :items="selected_items" />
          <div v-show="focused">
            <v-divider>preview</v-divider>
            <liner-list-group :items="parsed" :icons="icons" editable />
          </div>
        </v-list>
        <v-textarea label="logs" v-bind="$thx.field"
          v-model="value"
          placeholder="(keytype) title <link1,link2|anchor> and optional longlong description"
          hint="(keytype) title <link> desc; keytype and title are required"
          @keyup.enter.ctrl="append" @keyup.tab="append"
          @change="append" />
      </div>git
    </v-card-text>
  </v-card>
</template>

<script>
import Patterns from '@/models/patterns';
import Project from '@/models/project';
import linerListGroup from '@/viewer/components/linerListGroup.vue';
export default {
  name: 'historyField',
  components: {
    linerListGroup,
  },
  methods: {
    append() {
      if(this.value && 0<this.value.trim().length) {
        this.project.history_log({
          version: this.current_version,
          items: this.value,
        });
        this.value = null;
        this.$emit('update:project', this.project);
      }
    } 
  },
  props: {
    project: {type:Project, required: true},
    label: {type: String, required: false, default: 'history' },
  },
  computed: {
    editable() {
      return this.focused && (this.selected == this.current_version);
    },
    current_version() {
      return this.project.version;
    },
    selected_log() {
      return this.history.find((h)=>h.version==this.selected);
    },
    selected_items() {
      return (this.selected_log||{items:[]}).items;
    },
    selected_date() {
      return (this.selected_log||{date:[]}).date;
    },
    history() {
      return this.project.history;
    },
    versions() {
      return [this.project.version]
        .concat(this.history.map((h)=>h.version))
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
  data() {
    return {
      focused: true,
      value: '',
      selected: this.project.version,
    };
  }

}
</script>