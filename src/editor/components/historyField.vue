<template>
  <v-card flat>
    <v-card-title>
      <v-label>History Logs</v-label>
    </v-card-title>
    <v-card-text class="d-flex flex-row">
      <div class="d-flex flex-column flex-fill">
        <v-text-field label="date" v-bind="$thx.field"
          readonly 
          placeholder="Date.now() (ISO format)" 
          :model-value="selected_date" />
        <!-- liner view for other -->
        <v-list class="pa-0">
          <liner-list-group label="logs" :items="selected_items" editable />
        </v-list>
        <v-textarea label="+" v-bind="$thx.field"
          :disabled="!editable" v-model="value"
          placeholder="(keytype) title <link1,link2|anchor> and optional longlong description"
          hint="(keytype) title <link> desc; keytype and title are required"
          @change="append()" />
      </div>
      <v-tabs vertical v-model="selected" :items="versions" />
    </v-card-text>
  </v-card>
</template>

<script>
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
      return this.selected == this.current_version;
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
  },
  data() {
    return {
      value: '',
      selected: this.project.version,
    };
  }

}
</script>