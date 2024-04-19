import Request from './request'
import Response from './response'

export default class Template {
    static _store = {};

    constructor(name, basis) {
        // if(Template._store[name]) {
        //     throw new Error('Template already exists');
        // }
        this._name = name;
        this._extends = basis;
        this._description = null;
        // request data
        this._request = new Request();
        // response data
        this._response = new Response();
    }

    get name() {
        return this._name;
    }

    get extend() {
        return this._extends;
    }

    set extend(v) {
        // TODO: map template
        this._extends = v;
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