import Patterns from './patterns'
import Descriptable from './descriptable';
import Request from './request';
import Response from './response';
import Datatype from './datatype';

export default class Template extends Descriptable {
    static _store = {};

    constructor(name, parent) {
        super({});

        // if(Template._store[name]) {
        //     throw new Error('Template already exists');
        // }
        this._name = name;
        // extending parent template name
        this._extends = parent;
        this._tagname = null;
        this._datatypes = null;
        const base = Template._store[parent] || {};


        // description. first line served as summary
        this._summary = base._summary || '';
        this._desc = base._desc || '';
        // request data
        this._request = {
            ...Request.option(),
            ...(base.request || {}),
        }
        // response data
        this._response = {
            ...Response.option(),
            ...(base.response || {}),
        }

        // write on store
        Template._store[name] = this;
    }

    get el() {
        return `tmpl-${this.name}`;
    }

    get name() {
        return this._name;
    }

    get namespace() {
        return Patterns.naming_parse(this._name).namespace || '';
    }

    get localname() {
        return Patterns.naming_parse(this._name).localname || '';
    }

    get tagname() { return this._tagname; }

    set tagname(value) { this._tagname = value;}

    get extend() {
        return this._extends;
    }

    set extend(v) {
        // TODO: map template
        this._extends = v;
    }
    
    get request() {
        return this._request;
    }

    set request(value) {
        this._request = Object.assign(this._request, value);
    }


    get response() {
        return this._response
    }

    set response(value) {
        this._response = Object.assign(this._response, value);
    }

    get datatypes() {
        return this._datatypes || [];
    }

    set datatypes(values) {
        this._datatypes = Datatype.names(...values);
    }

    static get all() {
        return Object.values(Template._store);
    }

    static find(name) {
        if(name instanceof Template) {
            return name;
        } else if(name instanceof Object) {
            return Template.setup(name);
        } else {
            return Template._store[name] || null;
        }
    }

    static finds(...names) {
        return names.map((n)=>Template.find(n))
            .filter((v)=>v!==null);
    }

    static names(...tmpls) {
        return tmpls.map((t)=>t.name || t);
    }

    static setup({name, extend, tagname, description, request, response}) {
        const tmpl = new Template(name, extend);
        tmpl.tagname = tagname || null;
        tmpl.description = description || null;
        tmpl.request = request || {};
        tmpl.response = response || {};
        return tmpl;
    }

    static clear() {
        Template._store = {};
    }

    static merge(prev, next) {
        return Object.entries(next || {}).reduce((agg,[k,v])=>{
            // overwrites only for truthy values || 0, false.
            if(v || v===0 || v===false) {
                agg[k] = v;
            }
            return agg;
        }, prev);
    }

    static build(...names) {
        // const init = {
        //     templates: Template.names(...tmpls),
        //     description: null,
        //     request: Request.option(),
        //     response: Response.option(),
        // };
        const tmpls = Template.finds(...names);
        return {
            templates: Template.names(...names),
            description: tmpls.reduce((agg,tmpl)=>`${agg}\n${tmpl.description}`.trim(), ''),
            request: Request.merge(...tmpls.map((tmpl)=>tmpl.request)),
            response: Response.merge(...tmpls.map((tmpl)=>tmpl.response)),
        };
    }
}