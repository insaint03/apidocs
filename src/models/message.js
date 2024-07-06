import Descriptable from "./descriptable";
import Patterns from "./patterns";
import Datatype from "./datatype";
import Template from './template';

export default class Message extends Descriptable {
    static http = 'HTTP/1.1';

    constructor({headers, cookies, body}, ...templates) {
        super({});
        this.headers = headers || [];
        this.cookies = cookies || {};

        this._body_candidates = null;
        
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