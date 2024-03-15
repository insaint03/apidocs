import { defineStore } from "pinia";
import { ref } from "vue";

const tabs = [
    'datatype',
    'entity',
    'tempalte',
];

export const useEditorStore = defineStore('editor', ()=>({
    tabs: ref(tabs),
    focusing: ref('entity'),
}));