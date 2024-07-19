import Descriptable from "./descriptable";
import Request from "./request";
import Response from "./response";
import Template from "./template";

// import ArrayItems from "./meta/arrayItems";
import ObjectItems from "./meta/objectItems";

//TODO: ? Entity should be - more thoughly data container, 
// limited computing properties
export default class Entity extends Descriptable {
    constructor({templates, description, request, response}) {
        super({description,});
        this._tmpls = [].concat(templates);
        this._trails = null;
        this._tagnames;
        this._request = new Request(request || {}, ...this.templates);
        this._response = new Response(response || {}, ...this.templates);
    }

    get ep() {
        return `[${this.request.method}] ${this.request.path}   `
    }

    get el() {
        return `ep-${encodeURI(this.ep)}`;
    }

    // tmpls only holds template names(string)
    get template_names() {
        return this._tmpls || [];
    }
    set template_names(values) {
        this._tmpls = values;
        // update request/response bases
        this.update_templates();
    }
   

    get templates() {
        return Template.finds(...this.template_names)
            .filter((t)=>t!=null);
    }

    set templates(values) {
        this.template_names = Template.names(...values);
    }

    // check template affiliation
    affiliated(template_name) {
        return this.template_names.includes(template_name);
    }


    // get templates
    get tagnames() {
        return this.templates
            .filter((tmpl)=>tmpl.tagname)
            .reduce((agg,tmpl)=>
            agg.concat(tmpl.tagname), 
        []).filter((t,i,a)=>a.indexOf(t)===i);
    }

    get request() {
        return this._request;
    }
    
    get response() {
        return this._response;
    }

    // set request(value) {
    //     this._request = value;
    // }

    /* pass request properties */
    // desc
    get request_desc() {return this.request.description;}
    set request_desc(value) {this.request.description = value;}
    // method
    get request_method() {return this.request.method;}
    set request_method(value) {this.request.method = value;}
    // pathname
    get request_pathname() {return this.request.pathname;}
    set request_pathname(value) {this.request.path = value;}
    // queries
    get request_queries() {return this.request.query_text }
    set request_queries(value) {this.request.query_text = value;}
    // headers
    get request_headers() {return this.request.headers.text;}
    set request_headers(value) {
        this._request.headers = (value||'').split('\n');}
    // cookies
    get request_cookies() {return this.request.cookies.text;}
    set request_cookies(value) {
        this._request.cookies = (value||'').split('\n')
            .map(ObjectItems.parse);}
    // body
    get request_body() {return this.request.body.text;}
    set request_body(value) {this._request.body = value;}

    /* pass response properties*/
    // desc
    get response_desc() {return this.response.description;}
    set response_desc(value) {this._response.description = value;}
    // status
    get response_status() {return this.response.status;}
    set response_status(value) {this._response.status = value;}
    // mimetype
    get response_mimetype() {return this.response.mimetype;}
    set response_mimetype(value) {this._response.mimetype = value;}
    // headers
    get response_headers() {return this.response.headers;}
    set response_headers(value) {this._response.headers = value;}
    // cookies
    get response_cookies() {return this.response.cookies;}
    set response_cookies(value) {this._response.cookies = value;}
    // body
    get response_body() {return this.response.body;}
    set response_body(value) {this._response.body = value;}


    // set response(value) {
    //     this._response = {...this.response_base, ...value};
    // }

    get serialized() {
        return {
            templates: this.template_names,
            description: this.description,
            request: this.request.serialized,
            response: this.response.serialized,
            ...super.serialized,
        }
    }

    static setup({templates, description, request, response}) {
        return new Entity({templates, description, request, response});
    }
}