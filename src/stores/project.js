import { defineStore } from "pinia";
// import { ref } from "vue";

import models from '@/models';
const storage_key = 'apidocs';

export const useProjectStore = defineStore('project', ()=>({
    state: ()=>(models.state),
    getters: {
        project_ready() {
            return this.state.project && this.state.project.name;
        },
        has_datatypes() {
            return this.state.datatypes && Object.entries(this.state.datatypes).length > 0;
        },
        has_entities() {
            return this.state.entities && this.state.entities.length > 0;
        },

        migrations() {
            return this.state.datatypes.filter((d)=>d.migration);
        },
        tagnames() {
            return this.state.entities.map((e)=>e.name);
        }
    },
    actions: {
        loads(location) {
            // load data
            const content = models.loads(location);
            // setup concurrent states
            models.state = content;
            // cache it
            this.caches();
            // announce state change
            return models.state;
        },
        clear: models.clear,
        // cache current state into sessionStorage
        caches() {
            models.save_storage('session');
        },
        revoke() {
            models.state = models.load_storage('session');
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
}));