import { defineStore } from 'pinia'
import { useProjectStore } from './project'

import Entity from '@/models/entity'
import Template  from '@/models/template'

const fields = [
    'name',
    'datatypes',
    'description',
    'tagname',
    'extends',
    'request',
    'response',
]

export const useTemplateStore = defineStore('templates', {
    state: ()=>({
        project: useProjectStore(),
        selected: null,
        fields,
    }),
    getters: {
        all() { return this.project.template_list; },
        all_tags() { return this.project.tags; },
        all_none_tags() {
            return this.project.template_list
                .filter((tmpl)=>tmpl.tagname==null);
        },
        datatypes() {
            return Object.values(this.project.datatypes)
                .map((d)=>d.name);
        },
        default_mix() {
            return Template.names(...Template.default_mixline());
        }
    },
    actions: {
        create_new(name, extend) {
            this.project.templates[name] = new Template(name, extend);
        },
        builds(...lists) {
            this.project.entities = this.project.entities
                .concat(Template.mixture(...lists));
        }
    },
});