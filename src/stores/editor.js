import { defineStore } from "pinia";
import { ref } from "vue";

const tabs = [
    'parameter',
    'entity',
    'template',
];

export const useEditorStore = defineStore('editor', ()=>({
    tabs: ref(tabs),
    // focusing tab
    focusing: ref('entity'),
    // current editing data
    on_parameter: ref(null),
    on_entity: ref(null),
    on_template: ref(null),
}));