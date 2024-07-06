import YAML from 'js-yaml';
import Project from '@/models/project';
import Datatype from '@/models/datatype';
import Template from '@/models/template';
import Entity from '@/models/entity';
import Patterns from '@/models/patterns';

const yaml_parse = YAML.load;
const yaml_stringify = YAML.dump;

const recent_key = '_recents';
const recent_max = 5;

const serialized = ({location,project,datatypes,templates,entities,timestamp}) => {
    const serialize_obj = ((obj)=>Object.fromEntries(
        Object.entries(obj).map(([k,v])=>[k,v.serialized])
    ));
    return {
        location,
        project:project.serialized,
        datatypes: serialize_obj(datatypes),
        templates: serialize_obj(templates),
        entities: entities.map((e)=>e.serialized),
        timestamp: timestamp || Date.now(),
    };
};


export default {
    location: null,
    project: new Project({}),
    datatypes: {},
    templates: {},
    entities: [],
    timestamp: Date.now(),
    items: {
        item: Patterns.item_items,
        liner: Patterns.liner_items,
    },

    // clear current setups
    clear(){
        this.location = new Project({});
        this.project = {};
        this.datatypes = {};
        Datatype.clear();
        this.templates = {};
        Template.clear();
        this.entities = [];
    },

    get dtypes() {
        return Object.values(this.datatypes);
    },

    get tmpls() {
        return Object.values(this.templates);
    },

    get state() {
        return {
            location: this.location,
            project: this.project,
            datatypes: this.datatypes,
            templates: this.templates,
            entities: this.entities,
            timestamp: this.timestamp,
            // tags: this.tags,
        }
    },

    get_tags(store) {
        return Object.values(store.templates)
            .filter((tmpl)=>tmpl.tagname!=null);
            // .map((tmpl)=>({
            //     ...tmpl,
            //     entities: this.entities.filter((e)=>e.templates.includes(tmpl.name)),
            // }));
    },

    get_tag_datatypes() {
        return Object.fromEntries(this.tags.map((tmpl)=>[
            tmpl.tagname, 
            tmpl.datatypes,
        ]));
    },

    get_tag_entities() {
        return Object.fromEntries(this.tags.map((tmpl)=>[
            tmpl.tagname, 
            this.entities.filter((e)=>e.templates.includes(tmpl.name)),
        ]));
    },

    get_migrations(store) {
        return Object.values(store.datatypes)
            .filter((d)=>d.migration!=null);
    },

    get_endpoints(store) {
        return store.entities.reduce((agg, entity, index)=>{
            const pathname = entity.request.pathname;
            const method = entity.request.method;
            const requests = entity.request.body;
            const status = entity.response.status;
            const mimetype = entity.response.mimetype;
            const responses = entity.response.body;

            agg[pathname] = (agg[pathname] || []);
            agg[pathname].push({
                index: index+1,
                entity,
                tags: entity.tagnames,
                // request properties
                request: entity.request,
                pathname, 
                method, 
                requests,
                // responnse properties
                response: entity.response,
                status,
                mimetype,
                responses,
            });
            return agg;
        }, {});
    },

    get_endpathes(store) {
        return Object.keys(store.endpoints)
            .sort((l,r)=>l.localeCompare(r));
    },

    _hierarchical_loads(puts, setup, find_parent, presets) {
        const entries = Object.entries(puts);
        const to_loads = [].concat(entries);
        let iterations = (entries.length+1)*2;
        const rets = {};
        while(--iterations>0 && to_loads.length>0) {
            const [key, value] = to_loads.shift();
            const prerequisit = find_parent(key, value);
            if(prerequisit && !presets.includes(prerequisit)) {
                to_loads.push([key, value]);
                continue;
            } 
            rets[key] = setup(key, value);
            // rets.push(setup(key, value));
            presets.push(key);
        }
        return rets;
    },

    set state(values) {
        this.location = values.location;
        // build project info
        this.project = new Project({...(values.project)});
        // and load datatypes
        this.datatypes = 
            this._hierarchical_loads(values.datatypes || values.data.datatypes || {},
                (k,v)=>Datatype.setup({name: k, ...v}),
                (k,v)=>v.basistype,
                Datatype.names(...Datatype.all),
            );
        // then templates next,
        this.templates = 
            this._hierarchical_loads(values.templates || values.data.templates || {},
                (k,v)=>Template.setup({name: k, ...v}),
                (k,v)=>v.extend,
                Template.names(...Template.all),
            );
        // finally, load entities
        this.entities = (values.entities || values.data.entities)
            .filter((e)=>e!=null)
            .map((e)=>new Entity(e));
        // setup timestamped
        this.timestamp = values.timestamp || Date.now();
    },

    

    // serialize data (defaults current state) to json
    async serialize_json(loads) {
        loads = loads || this.state;
        return JSON.stringify(serialized(loads));
    },

    // deserialize json to object. state change not provided
    async deserialize_json(loads) {
        const content = JSON.parse(loads);
        return {
            location: content.location,
            project: content.project,
            datatypes: content.datatypes,
            templates: content.templates,
            entities: content.entities,
            timestamp: content.timestamp,
        }
    },

    async serialize_yaml(loads) {
        loads = loads || this.state;
        return yaml_stringify(serialized(loads));
    },

    // TODO: deserialize yaml to object. state change not provided
    async deserialize_yaml(yaml) {
        const content = yaml_parse(yaml);
        return {
            location: content.location,
            project: content.project,
            datatypes: content.datatypes,
            templates: content.templates,
            entities: content.entities,
            timestamp: content.timestamp,
        }
    },

    // recover data from an object
    async recover(loads) {
        this.location = loads.location;
        this.project = loads.project;
        this.datatypes = loads.datatypes;
        this.templates = loads.templates;
        this.entities = loads.entities;
        this.timestamp = loads.timestamp;
    },

    // save data to local/session storage
    async save_storage(type='session') {
        const storage = eval(`${type.toLowerCase()}Storage`);
        storage.setItem('apidocs', await this.serialize_yaml());
    },

    // load data from local/session storage
    async load_storage(type='session') {
        const storage = eval(`${type.toLowerCase()}Storage`);
        return await this.deserialize_yaml(storage.getItem('apidocs'));
    },


    // load data from a given location
    async loads(location) {
        // clear current data
        this.clear();

        // try import file content from the path
        this.location = location;
        let raw = null;
        let content = null;
        // load by location uri
        if(/^\w+:/i.test(location)) {
            raw = await (await fetch(location)).text();
            if(/.json$/i.test(location)) {
                content = await JSON.parse(raw);
            } else {
                content = await yaml_parse(raw);
            }
        } else {
            raw = await import(location /* @vite-ignore */);
            content = raw.default || raw;
        }

        
        return ({
            location,
            raw,
            // timestamp: content.timestamp || Date.now(),
            ...content,
        });
    },

    build(...tmpls) {
        return new Entity(Template.build(...tmpls));
    },

    // from arrays of templates, build combinatorial entities
    combinatorial(...tmplss) {
        // build combination products
        return tmplss.reduce(
            (agg,tmpls)=>agg.map((ln)=>tmpls.map((tmpl)=>ln.concat([tmpl]))).flat()
        , [[]])
            .map((ln)=>new Entity(Template.build(...ln)));
    },

    get recents() {
        return JSON.parse(localStorage.getItem(recent_key) || '[]');
    },

    set recents(value) {
        const locations = [];
        const items = [value].concat(this.recents)
            .filter(v=>v&&v.location)
            .reduce((agg,it)=>{
                if(locations.includes(it.location)) {
                    return agg;
                } else {
                    locations.push(it.location);
                    return agg.concat(it);
                }
            }, []);
        
        localStorage.setItem(recent_key, 
            JSON.stringify(items
                // limit to recent_max
                .filter((v,i)=>i<recent_max))
        );
    },
}