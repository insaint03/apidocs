import Message from './message.js';
import Patterns from './patterns.js';
import Datatype from './datatype.js';

import ObjectItems from './meta/objectItems.js';

export default class Request extends Message {
    static methods = [
        'GET',
        'POST',
        'PUT',
        'DELETE',
        'PATCH',
        'OPTIONS',
        'HEAD',
        'CONNECT',
        'TRACE',
    ];
    static path_type = Patterns.path_type;
    static path_delimiter = '/';
    static path_separator = '\n';

    constructor(option={}, ...templates) {
        const tmpls = templates.map((t)=>t.request);
        const {method, path, queries, cookies, headers, body, description} = Request.merge(...tmpls, option);

        super({cookies, headers, body, description}, ...templates);
        this.method = (method||'GET').toUpperCase();
        this._path_matches = null;
        this._queries = new ObjectItems(queries);
        
        // set path & query
        this.path = path;
        this.queries = queries;
    }


    get definition() {
        return `${this.method} ${this.path} ${Message.http}`;
    }

    get pathname() {
        return this.path.map(Patterns.path_serialize)
            .join(Request.path_delimiter);
    }
    set pathname(values) {
        this.path = values;
    }

    get path() {
        return this._path || [];
    }

    set path(values) {
        this._path = (values || '').split(Request.path_delimiter)
        .map(Patterns.path_parse);
    }

    path_fragment(index) {
        return this._path[index] || null;
    }

    path_match(path) {
        const passes = {
            [Patterns.path_type.parameter]: (obj, frag)=>frag!=null || Datatype.find(obj.datatype).validate(frag),
            [Patterns.path_type.extender]: ()=>true,
            [Patterns.path_type.text]: (obj, frag)=>obj.text === frag,
        }
        return path.split('/').reduce((agg, frag, index)=>{
            const obj = this._path[index];
            return agg && passes[obj.type](obj, frag);
        }, true);
    }

    
    // parsing queries input
    //  the value should match one of the followings:
    // - array of {key, datatype, required, defaults}
    // - array of string matches Patterns.item
    // - object of {key: {datatype, required (or optional), defaults}}
    // - object of {key: value_string} that may `${key}:${value_string}` matches Patterns.item
    // - multiline text of lines matching Patterns.item
    static _parsing_query_conditions = [
        // array container
        {
            container: Array.isArray,
            separate: (c)=>c,
            items: [
                // array of {key, datatype, optional, defaults}
                {
                    constraint: (it)=>typeof(it)==='object' && it.key && it.datatype, 
                    parse: (it)=>({...it, required: it.required || !it.optional}), 
                },
                // array of 'key:datatype=defaults'
                {
                    constraint: (it)=>typeof(it)==='string', 
                    parse: (token)=>Patterns.item_parse(token)
                }
            ],
        },
        // object container
        {
            container: (c)=>(c instanceof Object), 
            separate: Object.entries,
            items: [
                // object of {key: {datatype, optional, defaults}}
                {
                    constraint: ([k,v])=>typeof(k)==='string' && typeof(v)==='object' && v.datatype, 
                    parse: ([k,v])=>({key: k, datatype: v.datatype, required: v.required || !v.optional, defaults: v.defaults || undefined}), 
                },
                // object of {key: datatype?=defaults}
                {
                    constraint: ([k,v])=>typeof(k)==='string' && typeof(v)==='string',
                    parse: ([key,token])=>Patterns.item_parse(`${key}:${token}`),
                },
            ],
        },
        // multiline text
        {
            container: (c)=>typeof(c)==='string',
            separate: (c)=>c.split('\n'),
            items: [
                // 'key=datatype?=defaults'
                {
                    constraint: (it)=>typeof(it)==='string' && it.includes('='),
                    parse: Patterns.item_parse,
                }
            ],
        }
    ];

    get queries() { 
        return this._queries;
    }
    get query_text() { 
        return this._queries.text; 
    }
    get query_items() { return this._queries.items; }
    set queries(values) {
        // object
        this._queries.value = values;
    }
    set query_text(value) { this._queries.text = value; }
    set query_items(values) { this._queries.items = values; }

    
    get serialized() {
        // all props
        const ret = {
            ...super.serialized,
            method: this.method,
            path: this.pathname,
            queries: this._queries.dict || {},
        };
        return ret;

    }

    static option() {
        return {
            method: null,
            path: '',
            queries: {},
            headers: [],
            cookies: [],
            // body constaints
            body: [],
        }
    }

    static option_serialize(loads) {
        // variate loads
        const {
            method, path, queries
        } = loads;
        const ret = {
            method,
            path,
        };
        if(queries && Object.values(queries).filter((q)=>q!=null).length>0) {
            ret.queries = queries;
        }
        ['headers', 'cookies', 'body'].forEach((key)=>{
            const vs = loads[key];
            if(vs && vs.length>0) {
                ret[key] = vs;
            }
        });
        return ret;
    }

    // object request options to derive final
    static merge(...reqs) {
        return reqs.reduce((agg, req)=>({
                method: req.method || agg.method,
                path: req.path || agg.path,
                queries: {
                    ...agg.queries, 
                    ...req.queries,
                },
                cookies: {
                    ...agg.cookies,
                    ...req.cookies,
                }, // unique
                headers: (agg.headers || []).concat(req.headers || [])
                    .filter((h,i,a)=>a.indexOf(h)===i), // unique
                // TODO: body constraints
                body: req.body || agg.body,
            }), Request.option());
    }
}