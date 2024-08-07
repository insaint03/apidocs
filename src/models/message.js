import Descriptable from "./descriptable";
import Datatype from "./datatype";

import ObjectItems from "./meta/objectItems";
import Constraints from "./meta/constraints";

export default class Message extends Descriptable {
    static http = 'HTTP/1.1';

    constructor({headers, cookies, body, desc, description}, ...templates) {
        super({desc, description,});
        this._headers = new ObjectItems(headers || []);
        this._cookies = new ObjectItems(cookies || {});
        this._templates = templates;

        if(Array.isArray(body)) {
            this._body_candidates = new Constraints(body);
            this._body = null;
        } else {
            this._body_candidates = null;
            this._body = body;
        }

        // this._body_candidates = new Constraints(body);
        // // console.log('message body', body);

        // // TODO: type suggestion
        // this._body = Array.isArray(body) ? null : body;
    }


    get headers() { return this._headers.value; }
    get headers_text() { return this._headers.text; }
    get header_items() { return this._headers.items; }
    set headers(value) { this._headers.value = value; }
    set headers_text(value) { this._headers.text = value; }
    set header_items(value) { this._headers.items = value; }

    get cookies() { return this._cookies.value; }
    get cookies_text() { return this._cookies.text; }
    get cookie_items() { return this._cookies.items; }
    set cookies(value) { this._cookies.value = value; }
    set cookies_text(value) { this._cookies.text = value; }
    set cookie_items(value) { this._cookies.items = value; }
    
    put_cookie(key, datatype, defaults, required) {
        this._cookies[key] = { datatype, defaults, required };
    }

    remove_cookie(key) {
        delete this._cookies[key];
    }

    get body() {
        // return Datatype.find(this._body);
        return this._body ? Datatype.find(this._body) : null;
    }
    
    get bodytype() {
        return this._body || null;
    }

    set body(value) {
        console.log('set body', value);
        // const the_type = value ? Datatype.find(value) : null;
        this._body = typeof(value)==='object' ? value.name : value;
    }

    get serialized() {
        return {
            ...super.serialized,
            headers: this._headers.value,
            cookies: this._cookies.dict,
            body: this.bodytype,
        };
    }
}