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
        // request data
        this._request = {
            method: null,
            path_fragments: [],
            query: {},
            cookies: [],
            headers: [],
            body: null,
        }
        // response data
        this._response = {
            status: 200,
            mimetype: null,
            cookies: {},
            headers: {},
            body: null,
        }
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
}