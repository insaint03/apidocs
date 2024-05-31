import { defineStore } from "pinia";
// import { ref } from "vue";

import models from '@/models';
const storage_key = 'apidocs';

export const useProjectStore = defineStore('project', {
    state: ()=>models.state,
    getters: {
        project_ready() {
            return this.project && this.project.name;
        },
        has_datatypes() {
            return this.datatypes && Object.entries(this.datatypes).length > 0;
        },
        has_entities() {
            return this.entities && this.entities.length > 0;
        },

        datatype_list() {
            return Object.values(this.datatypes)
                .filter((dt)=>true 
                    ||dt.origintype==='object'
                    ||dt.origintype==='enum');
        },
        template_list() {
            return Object.values(this.templates);
        },
        tags() {
            return Object.values(this.templates)
                .map((tmpl)=>tmpl.tagname)
                .filter((t)=>t!=null);
        },
        tag_datatypes() {
            return models.tag_datatypes;
        },
        tag_entities() {
            return models.tag_entities;
        },
        migrations() {
            return Object.values(this.datatypes)
                .filter((dt)=>dt.migration);
        }
    },
    actions: {
        async loads(location) {
            // load data
            const content = await models.loads(location);
            // setup concurrent states
            models.state = content;
            console.log('loaded', models.state);
            // announce state change
            this.$state = {
                ...models.state,
            };
            // cache it
            this.caches();
            // announce state change
            return models.state;
        },
        clears: models.clear,
        // cache current state into sessionStorage
        caches() {
            models.save_storage('session');
        },
        revoke() {
            models.load_storage('session');
            // this.$state = { ...models.state};
        },
        // save current state into localStorage
        saves() {
            // cache update current status
            this.caches();
            // move session storage into local
            localStorage.setItem(storage_key, sessionStorage.getItem(storage_key));
        },
        // recover state from localStorage
        recovers() {
            // recover session storage from local
            sessionStorage.setItem(storage_key, localStorage.getItem(storage_key));
            this.revoke();
        }
    }
});