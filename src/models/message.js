import Patterns from "./patterns";

export default class Message {
    static http = 'HTTP/1.1';

    constructor({headers, cookies, body}) {
        this._headers = headers || [];
        this._cookies = cookies || {};
        this._body = body || null;
    }

    get headers() {
        return (this._headers || []).map(Patterns.item_serialize);
    }

    set headers(value) {
        // TODO: assert array
        this._headers = Patterns.map_items(value);
    }

    add_header(key, datatype, defaults, required) {
        this._header.push({key, datatype, defaults, required});
    }

    headers_of(key) {
        let keysearch = key.toLowerCase();
        return this.headers.filter((h)=>h.key.toLowerCase() === keysearch);
    }

    count_headers(key) {
        return this.headers_of(key).length;
    }

    remove_header(key, orindex) {
        this._headers = this.headers.filter((k,i)=> k !== key && i !== orindex);
    }
    

    get cookies() {
        return (this._cookies || []).map(Patterns.item_serialize);
    }

    set cookies(value) {
        this._cookies = Patterns.map_items(value);
    }

    put_cookie(key, datatype, defaults, required) {
        this._cookies[key] = { datatype, defaults, required };
    }

    remove_cookie(key) {
        delete this._cookies[key];
    }

    get body() {
        return this._body;
    }

    set body(value) {
        this._body = value;
    }
}