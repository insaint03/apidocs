<template>
  <v-label v-if="label">{{ label }}</v-label>
  <v-sheet class="markdown pt-0 pb-2 px-4 mb-4 border rounded-lg"
    :color="$thx.color.markdown">
    <div class="pa-4" v-html="htmls"></div>
  </v-sheet>
</template>
<script>
import markdownit from 'markdown-it';
export default {
  name: 'markDown',
  props: {
    label: {type: String, required: false, default: ''},
    modelValue: {type: String, default: ()=>''},
    html: {type: Boolean, default: false},
    xhtmlOut: {type: Boolean, default: false},
    breaks: {type: Boolean, default: false},
    langPrefix: {type: String, default: 'language-'},
    linkify: {type: Boolean, default: false},
    typographer: {type: Boolean, default: false},
    quotes: {type: String, default: '“”‘’'},
    highlight: {type: Function, default: ()=>''},
  },
  computed: {
    htmls() {
      return this.markdown.render(this.modelValue || '');
    }
  },
  data() {
    return {
      markdown: markdownit(),
      wrapper: {
        style: Object.entries(this.$thx.color.markdown)
          .map(([k,v])=>`${k}:${v}`).join(';'),
      },
      // value: this.modelValue,
    };
  }
}
</script>
<style scoped>
.markdown-wrapper {
  width: 100%;
  min-height: 2.5vh;
}

.markdown ul {
  display: block;
  list-style-type: armenian;
}
</style>