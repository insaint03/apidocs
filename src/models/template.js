import Request from './request'
import Response from './response'

export default class Template {
    static _store = {};

    constructor(name, parent_name) {
        if(Template._store[name]) {
            throw new Error('Template already exists');
        }
        this._name = name;
        this._parent = parent_name;
        this._description = null;
        // request data
        this._request = new Request();
        // response data
        this._response = new Response();
    }

    get name() {
        return this._name;
    }

    get path() {
        return this._request.path_fragments.join('/');
    }
    set path(v) {
        this._request.path_fragments = v.split('/');
    }

    get description() {
        return this._description
    }

    set description(v) {
        this._description = v;
    }

    get request() {
        return this._request;
    }

    get response() {
        return this._response
    }
}