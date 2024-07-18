import { defineStore } from "pinia";

// import { ref } from "vue";

import Project from '@/models/project';
import Template from '@/models/template';

import models from '@/models';
import gtm from '@/gtm.js';
const storage_key = 'apidocs';

export const useProjectStore = defineStore('project', {
    state: ()=>models.state,
    getters: {
        // project had set flag (boolean)
        project_ready(store) {
            return store.project && store.project.name;
        },
        has_datatypes(store) {
            return store.datatypes && Object.entries(store.datatypes).length > 0;
        },
        has_entities(store) {
            return store.entities && store.entities.length > 0;
        },

        // datatype list to show on the page
        //  - object, enum provided
        datatype_all() {
          return models.datatype_all;
        },
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
        load_state(data) {
            this.clears();
            models.state = data;
            this.$state = {
                ...models.state,
            };
            this.caches();

        },
        async loads(location) {
            gtm.push('load', {location,});

            // load data
            const content = await models.loads(location);

            this.load_state(content)
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
        get_filename(location) {
            const fmatch = /\/?(?<fname>[^/]+)$/.exec(location);
            return fmatch ? fmatch.groups.fname : location;

        },
        async serialize_json(value) { return await models.serialize_json(value || this) },
        async serialize_yaml(value) { return await models.serialize_yaml(value || this) },
        async download(filename) {
            // test filetype, defaults to yaml. json is also available
            const download = this.get_filename(filename)
            const serializer = /\.json$/.test(filename) 
                ? models.serialize_json 
                : models.serialize_yaml;
            // build download link
            const text = await serializer(this);
            const href = URL.createObjectURL(
                new Blob([text], {type: 'text/plain'})
            );
            Object.assign(
                document.createElement('a'), 
                { href, download,}
            ).click();
        },
        clears() {
            gtm.push('clear', {});
            models.clear();
            this.$state = {
                ...models.state,
                project: new Project({name: 'new project'}),
                templates: Template.all,
            }
            // this.$state.project = new Project({name: 'new project'});
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
        },
    }
});