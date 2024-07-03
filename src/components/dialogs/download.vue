<template>
  <v-dialog v-bind="$props">
    <v-card flat>
      <v-card-title>
        <v-btn icon flat @click="dispose">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        Download current
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field v-model="filename"
            @keyup.enter="downloads"
            label="filename" hint="data file name. (.json, .yaml) available" v-bind="$thx.field" />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn text flat @click="dispose">Close</v-btn>
        <v-spacer />
        <v-btn text flat @click="downloads">
          <v-icon>mdi-download</v-icon>
          Download
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions, mapState } from 'pinia';
import { useProjectStore } from '@/stores/project';

export default {
  name: 'downloadDialog',
  methods: {
    dispose() {
      this.$emit('update:model-value', false);
    },
    downloads() {
      this.download(this.get_filename(this.filename));
      // this.dispose();
    },
    ...mapActions(useProjectStore, [
      'get_filename',
      'download',
    ])
  },
  computed: {
    // filename() {
    //   return this.get_filename(this.url || this.location);
    
    // },
    ...mapState(useProjectStore, [
      'location',
    ]),
  },
  watch: {
    location() {
      // copy location
      this.filename = this.get_filename(this.location);
    }
  },
  props: {
    modelValue: Boolean,
  },
  data() {
    return {
      filename: null,
    };
  }
}
</script>