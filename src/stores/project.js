import { defineStore } from "pinia";

// import { ref } from "vue";

import models from '@/models';
import gtm from '@/gtm.js';
const storage_key = 'apidocs';

export const useProjectStore = defineStore('project', {
    state: ()=>models.state,
    getters: {
        // project had set flag (boolean)
        project_ready() {
            return this.project && this.project.name;
        },
        has_datatypes() {
            return this.datatypes && Object.entries(this.datatypes).length > 0;
        },
        has_entities() {
            return this.entities && this.entities.length > 0;
        },

        // datatype list to show on the page
        //  - object, enum provided
        datatype_list() {
            return Object.values(this.datatypes)
                .filter((dt)=>false
                    ||dt.origintype==='object'
                    ||dt.origintype==='enum');
        },
        // templates to show
        template_list() {
            return Object.values(this.templates);
        },
        // tag - named templates
        tags: models.get_tags,
        // datatypes by tagname
        tag_datatypes: models.get_tag_datatypes,
        // entities by tagname
        tag_entities: models.get_tag_entities,
        // migration provided datatypes
        migrations: models.get_migrations,
        // reorganize entities by request.path
        endpoints: models.get_endpoints,
        endpathes: models.get_endpathes,
        recents() {
            return models.recents;
        },
    },
    actions: {
        async loads(location) {
            gtm.push('load', {location,})
            // load data
            const content = await models.loads(location);

            // setup concurrent states
            models.state = content;
            // announce state change
            this.$state = {
                ...models.state,
            };
            // cache it
            this.caches();
            // push recent list
            models.recents = {
                location, 
                title:content.project.name, 
                desc: content.project.description,
                timestamp: content.timestamp || Date.now(),
            };
            // // announce state change
            // return models.state;
        },
        clears() {
            gtm.push('clear', {});
            models.clear();
            this.$state = {
                ...models.state,
            }
            return models.state;
        },
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