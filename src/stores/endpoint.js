import { defineStore } from "pinia";
import { useProjectStore } from "./project";

// import Entity from "@/models/entity";
import Request from "@/models/request";
import Response from "@/models/response";
// methods: Request.methods,
// mimetypes: Response.mimetypes,

export const useEndpointStore = defineStore('endpoint', {
    state: ()=>({
        project: useProjectStore(),
        // entities: this.project.entities,
        methods: Request.methods,
        mimetypes: Response.mimetypes,
        statuses: Response.status_all,
    }),
    getters: {
        endpoints() { return this.project.endpoints;},
        entities() { return this.project.entities; },
        template_list() { return this.project.template_list },
        datatype_list() { return this.project.datatype_list },
        datatype_all() { return this.project.datatype_all },
    }, 
    actions: {
    },
});