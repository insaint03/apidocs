import Patterns from './patterns'
import Descriptable from './descriptable';
import Request from './request';
import Response from './response';
import Datatype from './datatype';
import Entity from './entity';

import Name from './meta/name';

export default class Template extends Descriptable {
    static _store = {};

    constructor(name, parent) {
        super({});

        // if(Template._store[name]) {
        //     throw new Error('Template already exists');
        // }
        this._name = new Name(name);
        // extending parent template name
        this._extends = parent;
        this._tagname = null;
        this._datatypes = null;
        const base = Template._store[parent] || {};

        // request data
        this._request = {
            ...Request.option(),
            ...base.request,
        }
        // response data
        this._response = {
            ...Response.option(),
            ...base.response,
        }

        // write on store
        Template._store[name] = this;
    }

    get el() {
        return `tmpl-${this.name}`;
    }

    get name() { return this._name.value; }
    get namespace() { return this._name.namespace; }
    get localname() { return this._name.localname; }

    get tagname() { return this._tagname; }

    set tagname(value) { this._tagname = value;}

    get extends() {
        return this._extends;
    }

    set extends(v) {
        // TODO: map template
        this._extends = v;
    }
    
    get request() {
        return this._request;
    }

    set request(value) {
        this._request = Object.assign(this._request, value);
        if(value.body) {
            const body_constraints = Array.isArray(value.body)
                ? value.body : value.body.split('\n');
            this._request.body = body_constraints
                .map(Patterns.type_constraint_parse);
        }
    }

    get_body_constraints(of_message) {
        return (this[of_message].body||[])
            .map(Patterns.type_constraint_serialize)
            .join('\n');
    }

    set_body_constraints(of_message, value) {
        this[of_message] = {body: (value ||'').split('\n')
            .map(Patterns.type_constraint_parse)
            .filter((t)=>t!=null)};
    }

    // stringify request body constraints
    // get request_body() { return this.get_body_constraints('request'); }
    // set request_body(value) { this.set_body_constraints('request', value); }
    // get response_body() { return this.get_body_constraints('response'); }
    // set response_body(value) { this.set_body_constraints('response', value);}

    get response() {
        return this._response
    }

    set response(value) {
        this._response = Object.assign(this._response, value);
        if(value.body) {
            const body_constraints = Array.isArray(value.body)
                ? value.body : value.body.split('\n');
            this._response.body = body_constraints
                .map(Patterns.type_constraint_parse);
        }
    }

    get datatypes() {
        return this._datatypes || [];
    }

    set datatypes(values) {
        this._datatypes = Datatype.names(...values);
    }

    get serialized() {
        // const req_options = this.request
        return {
            name: this.name,
            tagname: this.tagname,
            datatypes: this.datatypes,
            request: Request.option_serialize(this.request),
            response: Response.option_serialize(this.response),
            ...super.serialized,
        }
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

    static setup({name, extend, tagname, datatypes, description, request, response}) {
        const tmpl = new Template(name, extend);
        tmpl.tagname = tagname || null;
        tmpl.datatypes = datatypes || [];
        tmpl.description = description || null;
        tmpl.request = request || {};
        tmpl.response = response || {};
        return tmpl;
    }

    static clear() {
        Template._store = [
            // defaults
            {name: '_foundation.root', request: {}, response: {mimetype: 'application/json'}},
            {name: '_foundation.auth', extend: '_foundation.root', request: {}, response: {}},
            {name: '_foundation.list', extend: '_foundation.root', request: {method: 'GET'}, response: {body: [{inherit: 'array'}]} },
            {name: '_foundation.get', extend: '_foundation.root', request: {method: 'GET'}, response: {body: [{inherit: 'object'}]} },
            {name: '_foundation.create', extend: '_foundation.root', request: {method: 'POST'}, response: {body: [{inherit: 'object'}]} },
            {name: '_foundation.update', extend: '_foundation.root', request: {method: 'PUT'}, response: {body: [{inherit: 'object'}]} },
            {name: '_foundation.delete', extend: '_foundation.root', request: {method: 'DELETE'}, response: {body: [{inherit: 'object'}]} },
        ].map(Template.setup).reduce((agg, tmpl)=>{agg[tmpl.name] = tmpl; return agg;}, {});
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
        return Entity.setup({
            templates: Template.names(...names),
            description: tmpls.reduce((agg,tmpl)=>`${agg}\n${tmpl.description}`.trim(), ''),
            request: Request.merge(...tmpls.map((tmpl)=>tmpl.request)),
            response: Response.merge(...tmpls.map((tmpl)=>tmpl.response)),
        });
    }

    /** mixture entities */
    static mixture(lines) {
        return lines
            .filter((ln)=>Array.isArray(ln)&&0<ln.length)
            .reduce((prev,line)=>{
            // cartesian product lines
            return prev.map((curr)=>line.map((name)=>curr.concat(name))).flat();
        }, [[]]).map((args)=>Template.build(...args));
    }

    static default_mixline() {
        return Template.finds(
            '_foundation.list', 
            '_foundation.get',
            '_foundation.create',
            '_foundation.update',
            '_foundation.delete',);
    }
}