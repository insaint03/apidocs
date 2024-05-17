import { defineStore } from "pinia";
import { ref } from "vue";

import Project from '@/models/project';
// import Parameter from "@/models/parameter";
// import Template from "@/models/template";
// import Request from "@/models/request";
// import Response from "@/models/response";


export const useProjectStore = defineStore('project', ()=>({
    state: ()=>({
        name: '',
        description: '',
        version: '',
        links: [],
        license: '',
        contributors: [],
        keywords: [],
    }),
}));