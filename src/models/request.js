import Message from './message.js';
import Patterns from './patterns.js';
import Datatype from './datatype.js';


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

    constructor({method, path, queries, cookies, headers, body}) {
        super({cookies, headers, body});
        this.method = (method||'GET').toUpperCase();
        this.path = path;
        this._path_matches = null;
        this.queries = queries;
    }


    get definition() {
        return `${this.method} ${this.path} ${Message.http}`;
    }

    get pathname() {
        return this.path.map(Patterns.path_serialize)
            .join(Request.path_delimiter);
    }

    get path() {
        return this._path || [];
    }

    set path(values) {
        this._path = (values || '').split(Request.path_delimiter)
            .map((frag)=>Patterns.path_parse(frag));
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
                    parse: (it)=>[it.key, {datatype: it.datatype, required: it.required || !it.optional, defaults: it.defaults || undefined}], 
                },
                // array of 'key:datatype=defaults'
                {
                    constraint: (it)=>typeof(it)==='string', 
                    parse: (token)=>{
                        const it = Patterns.item_parse(token);
                        return [
                            it.key,
                            {datatype: it.datatype, required: it.required, defaults: it.defaults},
                        ];
                    }
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
                    parse: ([k,v])=>[k, {datatype: v.datatype, required: v.required || !v.optional, defaults: v.defaults || undefined}], 
                },
                // object of {key: datatype?=defaults}
                {
                    constraint: ([k,v])=>typeof(k)==='string' && typeof(v)==='string',
                    parse: ([key,token])=>{
                        const it = Patterns.item_parse(`${key}:${token}`);
                        return [
                            it.key,
                            {datatype: it.datatype, required: it.required, defaults: it.defaults},
                        ];
                    }
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
                    parse: (token)=>{
                        const it = Patterns.item_parse(token);
                        return [
                            it.key,
                            {datatype: it.datatype, required: it.required, defaults: it.defaults},
                        ];
                    },
                }
            ],
        }
    ];

    get queries() {
        return Object.entries(this._queries || {})
            .map(([key,val])=>Patterns.item_serialize({key, ...val}))
            .join('\n');
    }

    set queries(values) {
        // values = values || [];
        this._queries = Request._parsing_query_conditions.reduce((agg, cond)=>{
            if(agg!=null || !cond.container(values)) {
                return agg;
            }
            return Object.fromEntries(
                cond.separate(values).map((row)=>{
                    return cond.items.reduce((agg, item)=>
                        agg || (item.constraint(row) 
                                ? item.parse(row) 
                                : null)
                        , null);
                }));
        }, null) || {};
    }

    query_fragment(key) {
        return this._queries[key] || {};
    }

    static option() {
        return {
            method: null,
            path: null,
            queries: {},
            cookies: [],
            headers: [],
            body: null,
        }
    }

    static merge(...reqs) {
        return reqs.reduce((agg, req)=>{
            return {
                method: agg.method || req.method,
                path: agg.path || req.path,
                queries: {
                    ...agg.queries, 
                    ...req.queries
                },
                cookies: (agg.cookies || []).concat(req.cookies || [])
                    .filter((c,i,a)=>a.indexOf(c)===i), // unique
                headers: (agg.headers || []).concat(req.headers || [])
                    .filter((h,i,a)=>a.indexOf(h)===i), // unique
                body: agg.body || req.body,
            }
        }, Request.option());
    }
}