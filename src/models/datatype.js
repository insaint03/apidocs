import NameDuplication from "@/exceptions/NameDuplication";
import ValueNotFound from "@/exceptions/ValueNotFound";
import InvalidValue from "@/exceptions/InvalidValue";

import Patterns from "./patterns";
import Descriptable from "./descriptable";

export default class Datatype extends Descriptable {

    constructor(name, basistype) {
        super({});
        this._name = name || '';
        // except for origin generation
        if(name === basistype) {
            this._basistype = null;
            this._origintype = name;
        } 
        // ordinary cases
        else {
            let basis = Datatype.find(basistype || Datatype.default_basis, true);
            this._basistype = basis.name;
            this._origintype = basis.origintype;
        }
        this._defaults = null;
        this._items = null;
        this._migration = null;
        
        // name validation
        if(Datatype._store.filter((p)=>p.name === name).length > 0) {
            throw new NameDuplication(Datatype._type, name);
        } else {
            Datatype._store.push(this);
        }
    }

    get el() {
        return `dt-${this.name}`;
    }

    get namespace() { return Patterns.naming_parse(this.name).namespace || ''; }
    get localname() { return Patterns.naming_parse(this.name).localname || ''; }
    get name() { return this._name; }
    set name(value) { 
        // name change validation
        if(Datatype.find(value, false)) {
            throw new NameDuplication(Datatype._type, value);
        }
        this._name = value;

    }

    // basis readonly (direct upper type)
    get basis() { return Datatype.find(this._basistype || this._origintype); }
    set basis(value) { 
        const _basis = Datatype.find(value);
        this._basistype = _basis.name;
        this._items = null;
        this._hierarchy = null;
    }
    get basistype() { return this._basistype; }
    set basistype(value) { 
        // don't need to check hierarchical updates 
        // because it goes through basis setter
        this.basis = value;
    }
    // origin readonly (originated type, primitive)
    get origin() { 
        return this.upstreams(()=>this._is_origin, (d)=>d)
            || Datatype.find(this.origintype);
    }
    get origintype() { 
        return this.origin.name;
    }

    // upstreaming hierarchy list
    // : chaning basis to origin
    // : (direction) from bottom -> top
    hierarchy() { 
        let queue = [];
        // run upstreams foreach
        this.upstreams((dt)=>{
            queue.push(dt.name);
            return dt.is_origin;
        }, (d)=>d);
        return queue.map(Datatype.find);
    }

    // 
    get validation() { return this._validation || null; }
    set validation(fn) { 
        // TODO: validation function check
        this._validation = fn;
    }

    get defaults() { return this._defaults; }
    set defaults(value) { this._defaults = eval(value); }

    get migration() { return this._migration; }
    set migration(value) { this._migration = value; }

    is_valid(value) {
        // run upstreams
        return this.hierarchy.reduce((pass, dt)=>{
            const determined = dt.validation(value);
            if(!determined) {
                throw new InvalidValue(Datatype._type, dt.name, `not valid ${value} for ${dt.name}`);
            }
            return pass && dt.validation(value);
        }, true);
    }
    
    // readonly primitive
    get is_primitive() { return this._is_primitive || false; }
    get is_origin() { return this._is_origin || false; }

    get examples() { return this._examples || []; }
    set examples(value) { 
        this._examples = value;
    }

    get is_collective() {
        return this.is_array || this.is_enum || this.is_object;
    }
    get is_array() { return this.origintype === 'array'; }
    get is_object() { return this.origintype === 'object'; }
    get is_enum() { return this.origintype === 'enum'; }

    /**
     * items should be array.
     *  if basis is array, items are type names of array items.
     *  else if basis is object, items are {key, type, description, required, nullable, defaults} instance.
     * in both cases, setting item overwrites existing list.
     */
    get items() {
        // if null, it is array or object but typed "any"
        if(this.is_object) {
            return (this._items||[]);
        } else if(this.is_array) {
            return this._items || [];
        } else if(this.is_enum) {
            return this._items || [];
        }
        else {
            return null;
        }

    }
    set items(value) {
        // expect value to be an array of strings
        if(this.is_collective) {
            // clear previous items
            this._items = [];
            
            // when items gets object
            if(!Array.isArray(value) && typeof value === 'object') {
                value = Object.entries(value)
                    .map(([k,v])=>`${k}:${v}}`);
            }
            // add new items
            this.parse_add_item(...value);
        }
    }

    parse_add_item(...tokens) {
        // assert tokens to be string
        tokens = tokens.filter((t)=>typeof t === 'string')
        //
        let auto_generates = [];

        // clear non-collectives
        if(this.is_object) {
            tokens = tokens.map(Patterns.item_parse)
                .map((it)=>Object.assign(it, {basistype: Datatype.find(it.datatype)}));
            auto_generates = tokens
                .map((t)=>t.datatype);
        } else if(this.is_array) {
            auto_generates = tokens;
        } else {
            return null;
        }
        this._items = (this._items || []).concat(tokens);
        // auto generate unspecified types
        auto_generates
            .filter((t)=>!Datatype.name_exists(t))
            .forEach((t)=>{
                Datatype.create(t, Datatype.default_basis);
            });
        return this.items;
    }

    is_descendant_of(origin) {
        let comparative_name = origin.name || origin;

        // origin or basis fast check
        if(this.basistype === comparative_name
        || this.origintype === comparative_name) {
            return true;
        }

        return this.upstreams((c)=>c.name === comparative_name) || false;
    }

    upstreams(proc, closure) {
        let iterations = 1e3;
        let cursor = this;
        let ret = null;
        do {
            ret = proc(cursor);
            if(ret) {
                return closure ? closure(cursor) : ret;
            }
            cursor = cursor.basis;
        } while(--iterations>0 && cursor.basis); 
        return closure ? closure(cursor) : null;
    }

    
    // returns direct children
    get children() {
        return Datatype.all
            .filter((d)=>d.basistype === this.name && d.name !== this.name);
    }

    // returns hierarhical descendant type list
    get descendants() {
        // within same origintype, 
        return Datatype.all
            // finds descendants of the datatype
            .filter((d)=>d.upstreams(
                ()=>d.basistype === this.name, 
                ()=>d.name === this.name));
    }

    // return types that contains the datatype
    get containers() {
        // it must be a collective type to have items
        return Datatype.all.filter((d)=>d.is_collective
            && d.items.reduce((g,it)=>g || ((it.name || it) === this.name), false));
    }

    // return list of datatypes which meets:
    //  1) this. 
    //  2) direct children. 
    //  3) other descendants 
    //  4) direct containers
    //  5) descendant containers
    get relatives() {
        // starts from 1)
        let queue = [this];
        const chs = this.children;
        const dscs = this.descendants;
        const conts = this.containers;
        const dcnts = this.descendants.map((d)=>d.containers).flat();

        return queue.concat(chs, dscs, conts, dcnts)
            // uniqueness
            .filter((d,i,a)=>a.indexOf(d) === i);
    }


    static default_basis = 'string';
    static _type = 'Datatype'
    // naming convention of: name.space.localname
    // 
    static _store = [];

    static find(name, must) { 
        // to prevent datatype instance naming
        const comparison = name.name || name;
        const ret = Datatype.all.find((d)=>d.name === comparison);
        if(must && !ret) {
            throw new ValueNotFound(Datatype._type, name);
        }
        return ret || null;
    }
    static finds(...names) {
        return names.map((n)=>Datatype.find(n))
            .filter((t)=>t);
    }

    static names(...types) {
        return types.map((t)=>t.name || t);
    }



    static get _has_initiated(){
        return 0<Datatype._store.length;
    }

    static clear() {
        // clear off
        Datatype._store = [];
    }

    static _initiate(){
        if(Datatype._has_initiated) {
            return;
        }
        Datatype._store = [
            // foundational
            {name: 'string', basis: null, summary: 'String', validation: (v)=>{ return typeof v === 'string'; }},
            {name: 'number', basis: null, summary: 'Number', validation: (v)=>{ return typeof v === 'number'; }},
            {name: 'boolean', basis: null, summary: 'Boolean', validation: (v)=>{ return typeof v === 'boolean'; }},
            {name: 'array', basis: null, summary: 'Array', validation: (v)=>{ return Array.isArray(v); }},
            {name: 'object', basis: null, summary: 'Object', validation: (v)=>{ return typeof v === 'object'; }},
            {name: 'enum', basis: null, summary: 'Enumeration', },
            
            // advanced basis
            {name: 'integer', basis: 'number', summary: 'Integer', validation: (v)=>{ return Number.isInteger(v); }},
            {name: 'float', basis: 'number', summary: 'Float', validation: (v)=>{ return typeof v === 'number'; }},
            {name: 'decimal', basis: 'string', summary: 'Decimal', desc: 'Decimal String', validation: (v)=>/^\d+$/.test(v)},
            {name: 'hex', basis: 'string', summary: 'Hexadecimal', desc: 'Hexadecimal String', validation: (v)=>/^[\da-fA-F]+$/.test(v)},
            {name: 'base64', basis: 'string', summary: 'Base64', desc: 'base64 formatted string', validation: (v)=>/^[\w+/]+={0,2}$/.test(v)},
            {name: 'date', basis: 'string', summary: 'Date', desc: 'ISO date string', validation: (v)=>/^\d{2,4}-\d{2}-\d{2}$/.test(v)},
            {name: 'time', basis: 'string', summary: 'Time', desc: 'ISO time string', validation: (v)=>/^\d{2}:\d{2}:\d{2}$/.test(v)},
            {name: 'datetime', basis: 'string', summary: 'Datetime', desc: 'ISO datetime string', validation: (v)=>/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(v)},
            {name: 'timestamp', basis: 'number', summary: 'Timestamp', desc: 'Unix timestamp', validation: (v)=>Number.isInteger(v)},
            {name: 'timestamp_nano', basis: 'number', summary: 'Timestamp Nano', desc: 'Unix timestamp in nanoseconds', validation: (v)=>Number.isInteger(v)},
            {name: 'email', basis: 'string', summary: 'Email', desc: 'Email address', validation: (v)=>/^[\w._%+-]+@[\w.-]+\.[a-z]{2,}$/i.test(v)},
            {name: 'uri', basis: 'string', summary: 'URI', desc: 'Uniform Resource Identifier', validation: (v)=>/^\w+?:\/\/[\w.-]+\.[a-z]{2,}/i.test(v)},
            {name: 'phone', basis: 'string', summary: 'Phone', desc: 'Phone number', validation: (v)=>/^\+?\d{2,4}-?\d{2,4}-?\d{2,4}$/.test(v)},
            {name: 'uuid', basis: 'string', summary: 'UUID', desc: 'Universally Unique Identifier', validation: (v)=>/^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/i.test(v)},
            
        ].map((opt)=>{
            let dt = new Datatype(opt.name, opt.basis || opt.name);
            dt._is_origin = (opt.basis == null);
            dt._is_primitive = true;
            dt.summary = opt.summary;
            // dt.migration = opt.migration;
            dt.description = opt.desc;
            dt.validation = opt.validation;
            return dt;
        });
    }

    static get all() {
        if(!Datatype._has_initiated) {
            Datatype._initiate();
        } 
        return Datatype._store;
    }

    // origin types
    static get origins() { return Datatype.all.filter((d)=>d.is_origin)}
    // initial primitive types
    static get primitives() { return Datatype.all.filter((d)=>d.is_primitive); }
    // types that has origins
    static get derivatives() { return Datatype.all.filter((d)=>d.basistype!=null); }
    // custom generated types 
    static get customs() { return Datatype.derivatives.filter((d)=>!d.is_primitive); }
    // custom derivatives
    static inheriteds(type) { return Datatype.all.filter((d)=>d.origin === type);}
    
    // object basis types
    static get objects() { return Datatype.inheriteds('object'); }
    // array basis types
    static get arrays() { return Datatype.inheriteds('array'); }
    // string basis types
    static get strings() { return Datatype.inheriteds('string'); }

    static list(filter) { return Datatype.all.filter(filter || (()=>true)); }
    
    static create(prefix, basis) {
        // generate unique name
        let name = prefix || '';
        let unique_counter = 0;
        let max_iteration = 1e2;
        while(Datatype.name_exists(name) && 0<max_iteration--) {
            name = `${prefix}${++unique_counter}`;
        }
        if(max_iteration <= 0) {
            name = `${prefix}${Date.now()}`;
        }
        return new Datatype(name, basis || Datatype.default_basis);
    }
    static name_exists(name) { 
        return Datatype.all.filter((p)=>p.name === name).length > 0; 
    }
    static naming_convention(name) {
        const parsed = Patterns.naming_parse(name);
        return {
            namespace: '',
            localname: name,
            ...parsed,
        };
    }
    static item_convention(token) {
        const parsed = Patterns.item_parse(token);
        return {
            required: false,
            key: null, 
            defaults: null,
            datatype: Datatype.default_basis,
            ...parsed,
        }
    }
    static item_object_stringify(item) {
        return Patterns.item_serialize(item);
    }
    static setup({name, basistype, description, validation, items, migration, examples, }) { 
        let dt = Datatype.create(name, basistype);
        dt.description = description;
        dt.validation = validation;
        dt.items = items;
        dt.migration = migration;
        dt.examples = examples;
        return dt;
    }

    
    // item row generator for object basis types
    static obj_item_row(key, typename, desc=null, required=false, nullable=true, defaults=null) {
        return {key, type: Datatype.find(typename), desc, required, nullable, defaults};
    }


}