<template>
  <list-selector 
    v-model="value"
    v-bind="binds"
  />
</template>

<script>
import listSelector from './listSelector.vue';

const licenses = [
  /** from https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository
   * @date 2024-04-22 dump
   */
  {code: 'AFL-3.0', title: 'Academic Free License v3.0' },
  {code: 'Apache-2.0', title: 'Apache license 2.0' },
  {code: 'Artistic-2.0', title: 'Artistic license 2.0' },
  {code: 'BSL-1.0', title: 'Boost Software License 1.0' },
  {code: 'BSD-2-Clause', title: 'BSD 2-clause "Simplified" license' },
  {code: 'BSD-3-Clause', title: 'BSD 3-clause "New" or "Revised" license' },
  {code: 'BSD-3-Clause-Clear', title: 'BSD 3-clause Clear license' },
  {code: 'BSD-4-Clause', title: 'BSD 4-clause "Original" or "Old" license' },
  {code: '0BSD', title: 'BSD Zero-Clause license' },
  {code: 'CC', title: 'Creative Commons license family' },
  {code: 'CC0-1.0', title: 'Creative Commons Zero v1.0 Universal' },
  {code: 'CC-BY-4.0', title: 'Creative Commons Attribution 4.0' },
  {code: 'CC-BY-SA-4.0', title: 'Creative Commons Attribution ShareAlike 4.0' },
  {code: 'WTFPL', title: 'Do What The F*ck You Want To Public License' },
  {code: 'ECL-2.0', title: 'Educational Community License v2.0' },
  {code: 'EPL-1.0', title: 'Eclipse Public License 1.0' },
  {code: 'EPL-2.0', title: 'Eclipse Public License 2.0' },
  {code: 'EUPL-1.1', title: 'European Union Public License 1.1' },
  {code: 'AGPL-3.0', title: 'GNU Affero General Public License v3.0' },
  {code: 'GPL', title: 'GNU General Public License family' },
  {code: 'GPL-2.0', title: 'GNU General Public License v2.0' },
  {code: 'GPL-3.0', title: 'GNU General Public License v3.0' },
  {code: 'LGPL', title: 'GNU Lesser General Public License family' },
  {code: 'LGPL-2.1', title: 'GNU Lesser General Public License v2.1' },
  {code: 'LGPL-3.0', title: 'GNU Lesser General Public License v3.0' },
  {code: 'ISC', title: 'ISC' },
  {code: 'LPPL-1.3c', title: 'LaTeX Project Public License v1.3c' },
  {code: 'MS-PL', title: 'Microsoft Public License' },
  {code: 'MIT', title: 'MIT' },
  {code: 'MPL-2.0', title: 'Mozilla Public License 2.0' },
  {code: 'OSL-3.0', title: 'Open Software License 3.0' },
  {code: 'PostgreSQL', title: 'PostgreSQL License' },
  {code: 'OFL-1.1', title: 'SIL Open Font License 1.1' },
  {code: 'NCSA', title: 'University of Illinois/NCSA Open Source License' },
  {code: 'Unlicense', title: 'The Unlicense' },
  {code: 'Zlib', title: 'zLib License' },
];
const fields = [
  {key: 'code', required: true, label: 'code' },
  {key: 'title', required: false, label: 'title'}, 
  {key: 'url', required: false, label: 'url' },
  {key: 'content', required: false, label: 'content', is:'v-textarea' },
];


export default {
  name: 'licensePicker',
  components: {
    listSelector,
  },
  props: {
    modelValue: {
      type: Object,
      required: false,
    },
  },
  computed: {
    modelTitle() {
      return this.value ? this.value.code : null;
    }
  },
  data() {
    return {
      binds: {
        items: licenses,
        fields,
        itemNew: 'generate custom',
        itemTitle: 'code',
        itemSubtitle: 'title',
      },
      value: this.modelValue,
    }
  }
}
</script>