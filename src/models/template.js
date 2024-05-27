import Patterns from './patterns'
import Descriptable from './descriptable';
import Request from './request';
import Response from './response';

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
        const base = Template._store[parent] || {};


        // description. first line served as summary
        this._summary = base._summary || '';
        this._desc = base._desc || '';
        // request data
        this._request = {
            // path function
            path: null,
            // stringtype http request methods. enum
            method: null,
            // query parameter map
            queries: {},
            // cookies [[key, datatype], ...]
            cookies: [],
            // headers [[key, datatype], ...]
            headers: [],
            // body datatype enum
            body: null,
            ...(base.request || {}),
        }
        // response data
        this._response = {
            // int type http status code enum
            status: null,
            // stringtype mimetype enum
            mimetype: null,
            // cookies [[key, datatype], ...]
            cookies: [],
            // headers [[key, datatype], ...]
            headers: [],
            // body datatype enum
            body: null,
            ...(base.response || {}),
        }

        Template._store[name] = this;
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

    get tagname() {
        return this._tagname;
    }

    set tagname(value) {
        this._tagname = value;
    }

    get extend() {
        return this._extends;
    }

    set extend(v) {
        // TODO: map template
        this._extends = v;
    }
    get description() {
        return [this._summary, this._desc].join('\n').trim();
    }

    set description(value) {
        if(value==null) {
            this._summary = null;
            this._desc = null;
        } else {
            const lines = value.split('\n');
            this._summary = lines.shift();
            this._desc = lines.join('\n').trim();
        }
    }

    get summary() {
        return this._summary || '';
    }

    get desc() {
        return this._desc || '';
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


    static find(name) {
        return (name instanceof Template ? name : Template._store[name]) || null;
    }

    static finds(...names) {
        return names.map((n)=>Template.find(n))
            .filter((v)=>v!==null);
    }

    static names(...tmpls) {
        return tmpls.map((t)=>t instanceof Template?t.name:t);
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

    static build(...tmpls) {
        const init = {
            templates: Template.names(...tmpls),
            description: null,
            request: Request.option(),
            response: Response.option(),
        };
        return Template.finds(tmpls).reduce((agg,tmpl)=>{
                agg.description = agg.description || tmpl.description;
                agg.request = Object.assign(agg.request, tmpl.request);
                agg.response = Object.assign(agg.response, tmpl.response);
                return agg;
            }, init);
    }
}