import { defineStore } from "pinia";
import { ref } from "vue";

const tabs = [
    'datatype',
    'entity',
    'template',
];

export const useEditorStore = defineStore('editor', ()=>({
    tabs: ref(tabs),
    // focusing tab
    focusing: ref('entity'),
    // current editing data
    editing: ref({
        datatype: null,
        entity: null,
        template: null,
    })
}));