import DatatypeDuplication from "@/exceptions/DatatypeDuplication";
import DatatypeNotFound from "@/exceptions/DatatypeNotFound";
import DatatypeNotValid from "@/exceptions/DatatypeNotValid";

export default class Datatype {
    static _store = [];
    static find(name, must=true) { 
        const ret = Datatype._store.find((d)=>{ return d.name === name; });
        if(must && !ret) {
            throw new DatatypeNotFound(name);
        }
        return ret;
    }


    static _initiate(){
        Datatype._store = [
            // foundational
            {name: 'string', basis: null, summary: 'String', validation: (v)=>{ return typeof v === 'string'; }},
            {name: 'number', basis: null, summary: 'Number', validation: (v)=>{ return typeof v === 'number'; }},
            {name: 'boolean', basis: null, summary: 'Boolean', validation: (v)=>{ return typeof v === 'boolean'; }},
            {name: 'array', basis: null, summary: 'Array', validation: (v)=>{ return Array.isArray(v); }},
            {name: 'object', basis: null, summary: 'Object', validation: (v)=>{ return typeof v === 'object'; }},
            
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
            let dt = new Datatype(opt.name, opt.basis);
            dt._is_primitive = true;
            dt.summary = opt.summary;
            dt.description = opt.desc;
            dt.validation = opt.validation;
            return dt;
        });
    }

    static get all() { 
        if(Datatype._store.length <= 0) {
            Datatype._initiate();
        }
        return Datatype._store;
    }
    // initial primitive types
    static get primitives() { return Datatype.all.filter((d)=>d.is_primitive); }
    // types that has origins
    static get derivatives() { return Datatype.all.filter((d)=>d.basistype!=null); }
    // custom generated types 
    static get customs() { return Datatype.derivatives.filter((d)=>!d.is_primitive); }
    // object basis types
    static get objects() { return Datatype.all.filter((d)=>d.origin === 'object'); }
    // array basis types
    static get arrays() { return Datatype.all.filter((d)=>d.origin === 'array'); }

    static list(filter) { return Datatype.all.filter(filter || (()=>true)); }
    static children(basis) { return Datatype.list((d)=>d.basis === basis);}

    constructor(name, basistype) {
        this._name = name;
        this._origin = basistype ? basistype : name;
        this._basistype = basistype;
        
        if(Datatype.find(name, false)) {
            throw new DatatypeDuplication(name);
        }
        Datatype._store.push(this);
    }

    get name() { return this._name; }
    rename(value) { this._name = value; }

    // basis readonly (direct upper type)
    get basis() { return Datatype.find(this._basistype || this.origin); }
    set basis(value) { this._basistype = value.name; }
    get basistype() { return this._basistype; }
    set basistype(value) { this._basistype = value; }
    // origin readonly (originated type, primitive)
    get origin() { return Datatype.find(this._origin) || this; }
    get origintype() { return this._origin || this.name; }
    get hierarchy() { 
        if(!this._hierarchy) {
            let cursor = this;
            // max upstreams 2K for safety
            let max_upstreams = 2e3;
            this._hierarchy = [this];
    
            while(0<--max_upstreams && this._hierarchy.indexOf(cursor) === -1) {
                cursor = cursor.basis;
                this._hierarchy.push(cursor);
            }
        }
        return this._hierarchy;
    }

    // 
    get validation() { return this._validation || null; }
    set validation(fn) { 
        // TODO: validation function check
        this._validation = fn;
    }

    is_valid(value) {
        // run upstreams
        return this.hierarchy.reduce((pass, dt)=>{
            const determined = dt.validation(value);
            if(!determined) {
                throw new DatatypeNotValid(dt.name, `not valid ${value} for ${dt.name}`);
            }
            return pass && dt.validation(value);
        }, true);
    }
    
    // readonly primitive
    get is_primitive() { return this._primitive || false; }

    get summary() { return this._summary; }
    set summary(value) { this._summary = value; }

    get description() { return this._desc; }
    set description(value) { this._desc = value; }

    get samples() { return this._samples || []; }
    set samples(value) { this.samples = this.samples.concat([value]) ; }

    get is_collection() {
        return this.is_array || this.is_object;
    }
    get is_array() { return this.basistype === 'array'; }
    get is_object() { return this.basistype === 'object'; }

    /**
     * items should be array.
     *  if basis is array, items are type names of array items.
     *  else if basis is object, items are {key, type, description, required, nullable, defaults} instance.
     * in both cases, setting item overwrites existing list.
     */
    get items() {
        // if null, it is array or object but typed "any"
        return this.is_collection ? this._items : undefined;
    }
    set items(value) {
        if(this.is_collection) {
            this._items = value;
        }
        // ignore rests
    }
    // item row generator for object basis types
    static obj_item_row(key, typename, desc=null, required=false, nullable=true, defaults=null) {
        return {key, type: Datatype.find(typename), desc, required, nullable, defaults};
    }
}