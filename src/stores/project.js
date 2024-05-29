import { defineStore } from "pinia";
// import { ref } from "vue";

import models from '@/models';
const storage_key = 'apidocs';

export const useProjectStore = defineStore('project', {
    state: ()=>(models.state),
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

        // tagnames
        tagnames() {
            return this.templates
                .filter((tmpl)=>tmpl.tagname!==null)
                .map((tmpl)=>({
                    tagname: tmpl.tagname, 
                    title: tmpl.name, 
                    _template: tmpl, 
                    datatypes: tmpl.datatypes,
                    apis: this.entities.filter((e)=>e.templates.includes(tmpl.name)),
                }));
        },
        tagtypes() {
            return this.templates
                .filter((tmpl)=>tmpl.tagname!==null && 0<tmpl.datatypes.length)
                .map((tmpl)=>({tag: tmpl.tagname, scheme: tmpl.datatypes}));
        },
        tagapis() {
            return this.tagnames
                .map((t)=>({
                    _apis: this.entities.filter((e)=>e.templates.includes(t.title)),
                    ...t,
                }));
        },
        migrations() {
            return this.datatypes.filter((d)=>d.migration);
        },
    },
    actions: {
        async loads(location) {
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
});