import Request from "./request";
import Response from "./response";
import Template from "./template";

export default class Entity {
    constructor({templates, description, request, response}) {
        this._tmpls = templates || [];
        this._desc = description || '';
        
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
        if(!this._templates) {
            this._templates = this._tmpls.map((tn)=>Template.find(tn))
                .filter((t)=>t!==null);
        }
        return this._templates;
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

    get request_raw() {
        return this._request;
    }

    set request(value) {
        this._request = {...this._request, ...value};
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
}