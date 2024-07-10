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

        // items() {
        //     return Object.values(useProjectStore().state.datatypes);
        // },
        // ordereds(){
        //     return this.items
        //         .filter(this.search)
        //         .sort(this.sorter_name);
        // },
        // search_pattern() {
        //     if(!this.search_text) {
        //         return ()=>true;
        //     }
    
        //     try {
        //         let pattern = new RegExp(this.search_text, 'i');
        //         return (p)=>pattern.test(p.name || p);
        //     } catch {
        //         return (p)=>(p.name || p).includes(this.search_text);
        //     }
        // },
        // groupeds(){
        //     return this.origins.map((o)=>({
        //         group: o,
        //         name: o.name,
        //         items: this.ordereds.filter((it)=>it.origintype == o.name),
        //     }));
        // },
        // singular(){
        //     return this.targets.length<=0 
        //         ? null :
        //         this.targets.length<=1;
        // },
        // // editor selection
        // editor(){
        //     let disables = [];
        //     let item = this.targets.reduce((agg, it)=>{
        //         keynames.forEach((key)=>{
        //             if(agg[key] === undefined) {
        //                 agg[key] = it[key];
        //             } else if(agg[key] != it[key]) {
        //                 agg[key] = null;
        //                 disables.push(key);
        //             } 
        //         });
        //         return agg;
        //     }, Object.fromEntries(keynames.map((key)=>[key, undefined])));
        //     let singular = null;
        //     if(this.targets.length <= 1) { singular = true; }
        //     else if(1<this.targets.length) { singular = false; }
        //     return {
        //         singular,
        //         disables,
        //         item,
        //     };
        // },
    },
    actions: {
        select(ev, item) {
            // multiple selection on ctrl or shift key
            if(ev.ctrlKey || ev.shiftKey) {
                this.selection = this.selection.includes(item)
                    ? this.selection.filter((it)=>it!=item)
                    : this.selection.concat([item]);
            } 
            // single selection
            else {
                this.selection = this.selection.includes(item) && this.selection.length<=1
                    ? [] : [item];
            }
        },
        updates(key, value) {
            // multiple update
            this.selection.map((it)=>this.datatypes[it])
                .filter((dt)=>dt!=null)
                .forEach((dt)=>dt[key] = value);
        },
        update_items(texts) {
            // split values
            this.selection.map((it)=>this.datatypes[it])
                .filter((dt)=>dt!=null)
                .forEach((dt)=>{
                    dt.items = texts;
                });
            // update new createds
            if(this.values.origintype==='object') {
                this.project.datatypes = Object.assign(this.project.datatypes, 
                    Object.fromEntries(Datatype.customs
                        .filter((t)=>!this.datatypes[t.name])
                        .map((t)=>[
                            t.name,
                            t,
                        ])
                    )
                );
            }
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
                const nt = Datatype.create(put.name, put.basistype);
                nt.is_primitive = put.is_primitive;
                return [put.name, nt];
            }));
            this.project.datatypes = Object.assign(this.project.datatypes, 
                newtypes);
            this.selection = [].concat(Object.keys(newtypes));
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