import { defineStore } from "pinia";
import { ref } from "vue";

import Service from '@/models/service';
// import Parameter from "@/models/parameter";
// import Template from "@/models/template";
// import Request from "@/models/request";
// import Response from "@/models/response";


export const useServiceStore = defineStore('service', ()=>({
    service: ref(new Service()),
    parameters: ref([]),
    templates: ref([]),
    entities: ref([]),    
}));