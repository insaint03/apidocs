import { defineStore } from 'pinia'
// import fields from '@/fields'

import Parameter  from '@/models/parameter'

const keynames = [
    'name',
    'basistype',
    'validation',
    'items',
    'migration',
    'description',
    'samples',
];

export const useDatatypeStore = defineStore('datatype', {
    state: () =>({
        // all list of parameters
        all: Parameter.all,
        origins: Parameter.origins,
        items: [].concat(Parameter.customs),
        // name search pattern
        search_text: '',
        // selected targets
        targets: [],
        treeshaped: Date.now(),
    }),
    getters: {
        ordereds(){
            return this.items
                .filter(this.search)
                .sort(this.sorter_name);
        },
        search_pattern() {
            if(!this.search_text) {
                return ()=>true;
            }
    
            try {
                let pattern = new RegExp(this.search_text, 'i');
                return (p)=>pattern.test(p.name || p);
            } catch {
                return (p)=>(p.name || p).includes(this.search_text);
            }
        },
        groupeds(){
            return this.origins.map((o)=>({
                group: o,
                name: o.name,
                items: this.ordereds.filter((it)=>it.origintype == o.name),
            }));
        },
        singular(){
            return this.targets.length<=0 
                ? null :
                this.targets.length<=1;
        },
        // editor selection
        editor(){
            let disables = [];
            let item = this.targets.reduce((agg, it)=>{
                keynames.forEach((key)=>{
                    if(agg[key] === undefined) {
                        agg[key] = it[key];
                    } else if(agg[key] != it[key]) {
                        agg[key] = null;
                        disables.push(key);
                    } 
                });
                return agg;
            }, Object.fromEntries(keynames.map((key)=>[key, undefined])));
            let singular = null;
            if(this.targets.length <= 1) { singular = true; }
            else if(1<this.targets.length) { singular = false; }
            return {
                singular,
                disables,
                item,
            };
        },
    },
    actions: {
        // parameter sorter by name (defaults)
        sorter_name(left,right){ return left.name.localeCompare(right.name); },
        search(p) {
            return this.search_pattern(p.name || p);
        },
        unselect(...it) {
            this.targets = 0<it.length
                ? this.targets.filter((t)=>!it.includes(t))
                : [];
        },
        single_select(it) {
            this.targets = [it];
        },
        multi_select(it) {
            this.targets = this.targets.includes(it) 
                ? this.targets.filter((t)=>t.name != it.name)
                : this.targets.concat([it]);
        },
        shake() {
            // shake the tree: renew the instance signature
            this.items = [].concat(this.items);
            this.treeshaped = Date.now();
        },
        updates(key, value) {
            // multiple update
            this.targets.forEach((it)=>it[key] = value);
        },
        appends(basistype, ...names) {
            let generates = names.map((n)=>Parameter.create(n, basistype || 'string') || null)
                .filter((p)=>p!=null);
            this.items = this.items.concat(generates);
        }

    }   
});