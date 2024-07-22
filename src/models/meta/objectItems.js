import Serializable from "./serializable";

export default class ObjectItems extends Serializable {
    static pattern = /^(?<required>!)?(?<key>[^:]+):(?<datatype>[^=/]+)(=(?<defaults>[^/]+?))?(\s*\/{2,}(?<comment>.*))?$/;
    static serialize({key, datatype, defaults, required, comment}) {
        return [
            required?'!':'',
            key,
            ':',
            datatype,
            defaults?`=${defaults}`:'',
            comment?`  // ${comment}`:'',
        ].join('');
    }
    static serialize_dict({datatype,defaults,comment}) {
        return [
            datatype,
            defaults?`=${defaults}`:'',
            comment?`  // ${comment}`:'',
        ].join('');
    }

    static parse(line) {
        const match = line.match(ObjectItems.pattern);
        return match ? {
            key: match.groups.key,
            datatype: (match.groups.datatype || '').trim(),
            defaults: match.groups.defaults,
            comment: match.groups.comment,
            required: !!match.groups.required,
        } : null;
    }

    constructor(value=[]) {
        super({});
        this.value = value;
    }

    get value() {
        return this._raw || [];
    }
    set value(values) {
        //
        if(values==null) {
            this._raw = [];
            return;
        }
        // Object case
        if(typeof(values)==='string') {

            values = values.split('\n');
        }
        if(typeof(values) === 'object' 
        && typeof(values.map)!=='function') {
            values = Object.entries(values)
                .map(([key,e])=>typeof(e)==='object'
                    ? {key, ...e}
                    : e.includes(`${key}:`) ? e : `${key}:${e}`);
        } 
        this.set_multiline_value(values, ObjectItems.serialize);
    }

    get text() { return this.value.join('\n'); }
    set text(values) { 
        this._raw = values.split('\n')
            .map((ln)=>ln.trim())
            .filter((ln)=>ln && 0<ln.length); 
    }
    get items() { return this.value.map(ObjectItems.parse); }
    set items(values) { this._raw = values.map(ObjectItems.serialize); }

    get dict() { 
        return Object.fromEntries(this._raw
            .map(ObjectItems.parse)
            .filter((it)=>it!=null)
            .map((it)=>[`${it.required?'!':''}${it.key}`, ObjectItems.serialize_dict(it)])
        );
    }
    set dict(values) {
        this._raw = Object.entries(values)
            .map(([key, e])=>[
                e.includes(`${key}:`) ? '' : `${key}:`,
                e
            ].join(''));
    }

    get object() {
        return Object.fromEntries(this._raw
            .map(ObjectItems.parse)
            .filter((it)=>it!=null)
            .map((it)=>[it.key, it])
        );
    }

    set object(values) {
        this._raw = Object.entries(values)
            .map(([key, e])=>[key, {key,...e}]);
    }
}