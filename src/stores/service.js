
import { defineStore } from "pinia";
import { ref } from "vue";

export const useServiceStore = defineStore('service', ()=>({
    info: ref({}),
    datatypes: ref([]),
    templates: ref([]),
    entities: ref([]),
}));