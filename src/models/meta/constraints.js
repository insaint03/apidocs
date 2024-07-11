import Serializable from "./serializable";

export default class Constraints extends Serializable {
    static prefixes = {
        // inherits the type
        '/': 'inherits',
        // contains the type as items property
        //  ; should be collective (object, array)
        '@': 'contains',
        // exact type specification
        '!': 'fixed',
        // has keyname
        //  ; must be object or enum
        '#': 'keyname',
    }

    static serialize(entry) {
        entry = entry || {};
        return Object.entries(Constraints.prefixes)
            .reduce((agg, [prefix, type])=>{
                return agg==null && entry[type]!=null
                    ? `${prefix}${entry[type]}`
                    : agg;
            }, null);
    }

    static parse(token) {
        if(typeof(token)==='object') {
            return token;
        } else {
            token = token || '';
            return Object.entries(Constraints.prefixes)
                .reduce((agg, [prefix, type])=>{
                    return agg==null && token.startsWith(prefix)
                        ? ({[type]: token.replace(prefix, '')})
                        : agg;
                }, null);
        }
    }

    constructor(value=[]) {
        super(value);
    }
    get value() { return this._raw || []; }
    // TODO
    set value(values) {
        this.set_multiline_value(values, Constraints.serialize);
    }
    get text() { return this.value.join('\n'); }
    set text(values) { this._raw = values.split('\n'); }
    get items() { return this.value.map(Constraints.parse).filter((it)=>it!=null); }
    set items(values) { this._raw = values.map(Constraints.serialize); }
}