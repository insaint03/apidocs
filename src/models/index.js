import YAML from 'js-yaml';
import Project from '@/models/project';
import Datatype from '@/models/datatype';
import Template from '@/models/template';
import Entity from '@/models/entity';
import Patterns from '@/models/patterns';

const yaml_parse = YAML.load;
const yaml_stringify = YAML.dump;

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
        this.templates = {};
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

    get tags() {
        return this.tmpls
            .filter((tmpl)=>tmpl.tagname);
    },

    get tag_datatypes() {
        return Object.fromEntries(this.tags.map((tmpl)=>[
            tmpl.tagname, 
            Datatype.finds(...tmpl.datatypes)
        ]));
    },

    get tag_entities() {
        return Object.fromEntries(this.tags.map((tmpl)=>[
            tmpl.tagname, 
            this.entities.filter((e)=>e.templates.includes(tmpl.name))
        ]));
    },

    get migrations() {
        return this.dtypes.filter((d)=>d.migration);
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
            this._hierarchical_loads(values.datatypes || {},
                (k,v)=>Datatype.setup({name: k, ...v}),
                (k,v)=>v.basistype,
                Datatype.names(...Datatype.all),
            );
        // then templates next,
        this.templates = 
            this._hierarchical_loads(values.templates || {},
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
        return JSON.stringify({
            location: loads.location,
            data: {
                project: loads.project,
                datatypes: loads.datatypes,
                templates: loads.templates,
                entities: loads.entities,
            },
            timestamp: loads.timestamp || Date.now(),
        });
    },

    // deserialize json to object. state change not provided
    async deserialize_json(loads) {
        const content = JSON.parse(loads);
        return {
            location: content.location,
            project: content.data.project,
            datatypes: content.data.datatypes,
            templates: content.data.templates,
            entities: content.data.entities,
            timestamp: content.timestamp,
        }
    },

    //TODO: serialize data (defaults current state) to yaml
    async serialize_yaml(loads) {
        loads = loads || this.state;
        return yaml_stringify({
            location: loads.location,
            data: {
                project: loads.project,
                datatypes: loads.datatypes,
                templates: loads.templates,
                entities: loads.entities,
            },
            timestamp: loads.timestamp || Date.now(),
        });
    },

    // TODO: deserialize yaml to object. state change not provided
    async deserialize_yaml(yaml) {
        const content = yaml_parse(yaml);
        return {
            location: content.location,
            project: content.data.project,
            datatypes: content.data.datatypes,
            templates: content.data.templates,
            entities: content.data.entities,
            timestamp: content.timestamp,
        }
    },

    // recover data from an object
    async recover(loads) {
        this.location = loads.location;
        this.project = loads.data.project;
        this.datatypes = loads.data.datatypes;
        this.templates = loads.data.templates;
        this.entities = loads.data.entities;
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
            raw = await import(location);
            content = raw.default || raw;
        }

        
        return {
            location,
            raw,
            // timestamp: content.timestamp || Date.now(),
            ...content,
        };
    },

    // build a new entity by mixing templates
    build(...templates) {
        return new Entity(Template.build(...templates));
    },

    // from arrays of templates, build combinatorial entities
    combinatorial(...tmplss) {
        // build combination products
        return tmplss.reduce(
            (agg,tmpls)=>agg.map((ln)=>tmpls.map((tmpl)=>ln.concat([tmpl]))).flat()
        , [[]])
            .map((ln)=>new Entity(Template.build(...ln)));
    }
}