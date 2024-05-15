import Patterns from './patterns'

export default class Template {
    static _store = {};

    constructor(name, parent) {
        // if(Template._store[name]) {
        //     throw new Error('Template already exists');
        // }
        this._name = name;
        // extending parent template name
        this._extends = parent;
        const base = Template._store[parent] || {};


        // description. first line served as summary
        this._summary = base._summary || '';
        this._desc = base._desc || '';
        // request data
        this._request = {
            // path fragment list
            path: [],
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
            ...(base.request || {})
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
            ...(base.response || {})
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
        const lines = value.split('\n');
        this._summary = lines.shift();
        this._desc = lines.join('\n').trim();
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

    get response() {
        return this._response
    }

    static find(name) {
        return Template._store[name];
    }
}