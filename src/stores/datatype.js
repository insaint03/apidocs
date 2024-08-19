import { defineStore } from 'pinia'
import { useProjectStore } from './project'

import Datatype  from '@/models/datatype'

const keynames = [
    'name',
    'origintype',
    'basistype',
    'validation',
    'items',
    'migration',
    'description',
    'samples',
];

export const useDatatypeStore = defineStore('datatype', {
    state: () =>({
        show: true,
        project: useProjectStore(),
        selected: '',
        selection: [],
        search_query: '',
        keynames,
    }),
    getters: {
        datatypes() { return this.project.datatypes; },
        alltypes() { return Datatype.all },
        values() {
            const init = Object.fromEntries(
                this.keynames.map((p)=>[p,undefined]));
                
            return this.selection.reduce((agg,name)=>{
                const the_type = this.datatypes[name];
                this.keynames.forEach((pn)=>{
                    const current = agg[pn];
                    const compare = the_type[pn];
        
                    if(current===undefined) {
                    agg[pn] = compare;
                    } else if(current!==compare) {
                    agg[pn] = null;
                    }
                });
                return agg;
            }, init);
        },
        item_values() {
            return this.values.items || true;
        },
        // value_texts() {
        //     return this.values.origintype ?
        //         Datatype.serialize_items(this.values.origintype, ...this.values.items || [])
        //         : '';
        // },
        types() {
            return Object.values(this.project.datatypes);
        },
        origins() {
            return Datatype.origins.map((dt)=>dt.name);
        },
        items() {
            let ret = Object.fromEntries(this.origins.map((origintype)=>[
                origintype,
                this.types
                    .filter((v)=>v.origintype===origintype
                    && !(this.search_pattern && !this.search_pattern.test(v.name)))
                ]));
            return ret;
        },
        search_pattern() {
            return (this.search_query && this.search_query.length>0) 
                ? new RegExp(this.search_query, 'i') 
                : null;
        },
        has_select() {
            return 0<this.selection.length;
        }
    },
    actions: {
        select(ev, item) {
            let now = [].concat(this.selection);
            if(now.includes(item)) {
                now.splice(now.indexOf(item), 1);
            } else if(ev.ctrlKey || ev.shiftKey) {
                now.push(item);
            } else {
                now = [item];
            }
            this.$patch({selection: Object.assign([],now), selected: Date.now()});
        },
        updates(key, value) {
            this.project.update_datatypes(key, value, ...this.selection);
            const changes = this.selection.reduce((agg, it)=>{
                agg[`datatypes.${it}`] = this.datatypes[it];
                return agg;
            }, {hasChanged: true});

            this.$patch(changes);
        },
        
        update_items(raw) {
            if(!raw) { return; }
            const newname = (container_name, item_key)=>`${container_name}._${item_key}`;
            // create_newtypes if needed
            raw.items
                .filter((it)=>it!=null)
                .filter((it)=>{
                    const dt = Datatype.find(it.datatype);
                    return dt!=null && dt.is_primitive
                })
                .forEach((it)=>{
                    // create new types by selections
                    this.create_new(...this.selection.map((s)=>({
                        name: newname(s, it.key),
                        basistype: it.datatype,
                        description: it.comment,
                    })));
                });
            this.$patch((state)=>{
                // sets
                this.selection
                    .map((dt)=>this.datatypes[dt])
                    .filter((dt)=>dt!=null)
                    .forEach((dt)=>{
                        const sets = raw.items
                            .map((it)=>{
                                const etype = Datatype.find(it.datatype);
                                // ignore not found 
                                if(etype==null) { return null; }
                                // use non-primitive type as-is
                                return etype.is_primitive ? {
                                    key: it.key,
                                    datatype: newname(dt.name, it.key),
                                    required: it.required,
                                    defaults: it.defaults,
                                    comment: it.comment,
                                } : it;
                            });
                        dt.items = sets.filter((it)=>it!=null);
                        // current.items = ;
                    });
                state.hasChanged = true;
            })
            
        },
        deletes(...selecteds) {
            selecteds = (selecteds || this.selection || []).flat();
            this.project.remove_datatypes(...selecteds);
            this.selection=[];
        },
        create_search() {
            const name = this.search_query;
            if(name && 0<name.length && Datatype.find(name)==null) {
                this.project.datatypes[name] = Datatype.create(name, 'object');
                this.selection = [name];
                this.search_query = '';
            }
            return null;
        },
        create_new(...puts) {
            const newtypes = Object.fromEntries(puts.map((put)=>{
                const nt = Datatype.setup(put);
                // nt.is_primitive = put.is_primitive;
                return [put.name, nt];
            }));
            this.project.datatypes = Object.assign(this.project.datatypes, 
                newtypes);
            return newtypes;
            // this.selection = [].concat(Object.keys(newtypes));
        },
        appends(...params) {
            let generates = [];
            params.forEach((n)=>{
                let p = Datatype.create(n.name, n.basistype);
                if(p) {
                    Object.entries(n)
                        .filter(([k])=>!['name', 'basistype'].includes(k))
                        .forEach(([k,v])=>p[k] = v);
                    generates.push(p);
                }
            });
            this.items = this.items.concat(generates);
        },
        findtype: Datatype.find,

    }   
});