import Descriptable from "./descriptable";
import Request from "./request";
import Response from "./response";
import Template from "./template";

// import ArrayItems from "./meta/arrayItems";
// import ObjectItems from "./meta/objectItems";

//TODO: ? Entity should be - more thoughly data container, 
// limited computing properties
export default class Entity extends Descriptable {
    constructor({templates, description, request, response}) {
        super({desc: description});
        this._tmpls = [].concat(templates);
        this._trails = null;
        this._tagnames;
        this._request = request || {};
        this._response = response || {};
        this.update_templates();
        // this.request_base = Request.merge(...templates.map((tmpl)=>tmpl.request));
        // this.response_base = Response.merge(...templates.map((tmpl)=>tmpl.response));
        // this._request_raw = null;
        // this._response_raw = null;
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
    
    update_templates() {
        this.request_base = Request.merge(...this.templates.map((tmpl)=>tmpl.request));
        this.response_base = Response.merge(...this.templates.map((tmpl)=>tmpl.response));
        this._request_raw = {
            ...this.request_base,
            ...this._request,
        };
        this._response_raw = {
            ...this.response_base,
            ...this._response,
        };
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
        return new Request(this.request_raw, ...this.templates);
    }
    set request(value) {
        this._request = value;
    }

    get request_raw() {
        return this._request_raw;
    }

    set request_raw(value) {
        this._request = value;
    }

    get response() {
        return new Response(this.response_raw, ...this.templates);
    }

    get response_raw() {
        return this._response_raw;
    }
    set resopnse_raw(value) {
        this._response = value;
    }

    set response(value) {
        this._response = {...this._response, ...value};
    }

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