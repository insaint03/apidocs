import Descriptable from "./descriptable";
import Patterns from "./patterns";
import Datatype from "./datatype";

export default class Message extends Descriptable {
    static http = 'HTTP/1.1';

    constructor({headers, cookies, body}) {
        super({});
        this.headers = headers || [];
        this.cookies = cookies || {};
        this.body = body || null;
    }

    get headers() {
        return (this._headers || []);
    }
    
    get header_texts() {
        return this.headers.map(Patterns.item_serialize);
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
        return (this._cookies || []);
    }

    set cookies(value) {
        this._cookies = Patterns.map_items(value);
    }

    get cookie_texts() {
        return this.cookies.map(Patterns.item_serialize);
    }

    put_cookie(key, datatype, defaults, required) {
        this._cookies[key] = { datatype, defaults, required };
    }

    remove_cookie(key) {
        delete this._cookies[key];
    }

    get body() {
        return this._body ? Datatype.find(this._body) : null;
        // return Datatype.find(this._body);
    }

    set body(value) {
        this._body = value;
    }
}