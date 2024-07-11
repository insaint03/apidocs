import Descriptable from "./descriptable";
import Datatype from "./datatype";
import Template from './template';

import ObjectItems from "./meta/objectItems";
import Constraints from "./meta/constraints";

export default class Message extends Descriptable {
    static http = 'HTTP/1.1';

    constructor({headers, cookies, body}, ...templates) {
        super({});
        this._headers = new ObjectItems(headers);
        this._cookies = new ObjectItems(cookies);

        this._body_candidates = new Constraints(null);
        
        // templates presented -- building message body
        if(Array.isArray(templates)) {
            this._body = body;
        } 
        // else - run body constraints
        else {
            // preprocessing: on multiline string
            if(typeof body === 'string') {
                // defaults inherit constraint
                body = body.split('\n').map((ln)=>`/${ln}`);
            }
            // set body type
            // value typed array - body constraints
            if(Array.isArray(body)) {
                // find from body type constraints
                const tmpl_candidates = Template.finds(...(templates || []))
                    .reduce((all, tmpl)=>all.concat(tmpl.datatypes), []);
                // secondary list: within custom-generated, excepts template candidates
                const secondaries = Datatype.customs
                    .map((dt)=>dt.name)
                    .filter((dt)=>!tmpl_candidates.includes(dt));
                const all = Datatype.all
                    .map((dt)=>dt.name)
                    .filter((dt)=>!secondaries.includes(dt) && !tmpl_candidates.includes(dt));
                this._body_candidates = Datatype.suggest(tmpl_candidates, body)
                    .concat(Datatype.suggest(secondaries, body))
                    .concat(Datatype.suggest(all, body));
                // set first candidate
                this.body = this._body_candidates[0];
            }

        }
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
        return this._body ? Datatype.find(this._body) : null;
        // return Datatype.find(this._body);
    }

    set body(value) {

        this._body = value;
    }

    get serialized() {
        const ret = {...super.serialized};
        if(0<this.headers.length) {
            ret.headers = this.header_texts;
        }
        if(0<this.cookies.length) {
            ret.cookies = this.cookie_texts;
        }
        if(this.body) {
            ret.body = this.body.name;
        }
        return ret;
    }
}