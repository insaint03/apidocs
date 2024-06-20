<template>
  <div class="markdown" v-html="htmls" />
</template>
<script>
import markdownit from 'markdown-it';
export default {
  name: 'markDown',
  props: {
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
      return this.markdown.render(this.value);
    }
  },
  data() {
    return {
      markdown: markdownit(),
      value: this.modelValue,
    };
  }
}
</script>