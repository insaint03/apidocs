import YAML from 'js-yaml';
import Project from '@/models/project';
import Datatype from '@/models/datatype';
import Template from '@/models/template';
import Entity from '@/models/entity';

const yaml_parse = YAML.load;
const yaml_stringify = YAML.dump;

export default {
    location: null,
    project: null,
    datatypes: {},
    templates: {},
    entities: [],
    timestamp: Date.now(),

    // clear current setups
    clear(){
        this.location = null;
        this.project = null;
        this.datatypes = [];
        this.templates = [];
        this.entities = [];
    },

    get state() {
        return {
            location: this.location,
            project: this.project,
            datatypes: this.datatypes,
            templates: this.templates,
            entities: this.entities,
            timestamp: this.timestamp,
        }
    },

    set state(values) {
        this.location = values.location;
        // build project info
        this.project = new Project({...(values.project || values.data.project)});
        // and load datatypes
        this.datatypes = Object.entries(values.datatypes||values.data.datatypes)
                .map(([k,v])=>Datatype.setup({name: k, ...v}));
        // then templates next,
        this.templates = Object.entries(values.templates || values.data.templates)
                .map(([k,v])=>Template.setup({name: k, ...v}));
        // finally, load entities
        this.entities = (values.entities || values.data.entities).map((e)=>new Entity(e));
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
}