import Serializable from "./serializable";

export default class Constraints extends Serializable {
    static prefixes = {
        // inherits the type
        '/': 'inherits',
        // contains the type as items property
        //  ; should be collective (object, array)
        '@': 'contains',
        // has keyname
        //  ; must be object or enum
        '#': 'keyname',
        // exact type specification
        '!': 'fixed',
    }

    static serialize(entry) {
        entry = entry || {};
        return Object.entries(Constraints.prefixes)
            .reduce((agg, [prefix, type])=>{
                return agg==null && entry[type]!=null
                    ? `${prefix}${entry[type]}`
                    : agg;
            }, null) || `!${entry}`;
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
                }, null) || {fixed: token};
        }
    }

    constructor(value=[]) {
        super();
        this.value = value;
    }
    get value() { return this._raw || []; }
    // TODO
    set value(values) {
        const none_prefixes = (v)=>Object.keys(Constraints.prefixes)
            .every((p)=>typeof(v)==='string' && 0<v.length && !v.startsWith(p));
        if(typeof(values)==='string'){
            values = values.split('\n');
        }
        this.set_multiline_value(
            values.map((ln)=>none_prefixes(ln)?`!${ln}`:ln),
            Constraints.serialize);
    }
    get text() { return this.value.join('\n'); }
    set text(values) { this._raw = values.split('\n'); }
    get items() { return this.value.map(Constraints.parse).filter((it)=>it!=null); }
    set items(values) { this._raw = values.map(Constraints.serialize); }

    // get suggestion over templates
    get_suggestion(haysack) {
        const candidates = this.get_candidates(haysack);
        return 0<candidates.length
            ? candidates.shift()
            : null;
    }

    get_candidates(haysack) {
        // fixed candidate at first
        const fixeds = this.items.filter(({fixed})=>fixed!=null)
            .map(({fixed})=>fixed);
        // others - inherits, contains, keyname in order
        const inherits = this.items.filter(({inherits})=>inherits!=null)
            .reduce((stack, {inherits})=>stack.concat(
                haysack.filter((d)=>d.is_descendant_of(inherits))
                    .map((d)=>d.name)),
                []);

        // TODO: for contains and keyname

        // const collectives = haysack.filter((dt)=>dt.is_collective);
        // const contains = this.items.filter(({contains})=>contains!=null)
        //     .reduce((stack, {contains})=>stack.concat(
        //         haysack
        //             .filter((dt)=>dt.is_collective)
        //             .filter((d)=>d.items.items_text.includes(contains))), 
        //         []);
        return [].concat(fixeds)
                .concat(inherits)
                .flat()
                // unique
                .filter((v,i,a)=>a.indexOf(v)===i);

    }
}