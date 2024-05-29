import Descriptable from "./descriptable";
import Request from "./request";
import Response from "./response";
import Template from "./template";

//TODO: ? Entity should be - more thoughly data container, 
// limited computing properties
export default class Entity extends Descriptable {
    constructor({templates, description, request, response}) {
        super({desc: description});
        this._tmpls = templates || [];
        
        this._templates = null;
        this._trails = null;
        this._tagnames;
        this._request = request || {};
        this._response = response || {};
    }

    // tmpls only holds template names(string)
    get template_names() {
        return this._tmpls;
    }

    get templates() {
        return this._tmpls.map(Template.find)
            .filter((t)=>t!=null);
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
        return new Request({
            ...this.templates.reduce((agg,tmpl)=>
                Object.assign(agg, tmpl.request)
            , {}),
            ...this._request,
        });
    }
    set request(value) {
        this._request = value;
    }

    get request_raw() {
        return this._request;
    }

    get response() {
        return new Response({
            ...this.templates.reduce((agg,tmpl)=>
                Object.assign(agg, tmpl.response)
            , {}),
            ...this._response,
        });
    }

    get response_raw() {
        return this._response;
    }

    set response(value) {
        this._response = {...this._response, ...value};
    }

    static setup({templates, description, request, response}) {
        return new Entity({templates, description, request, response});
    }
}