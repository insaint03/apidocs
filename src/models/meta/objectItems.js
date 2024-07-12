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
            ...match.groups,
            required: !!match.groups.required,
        } : null;
    }

    constructor(value=[]) {
        super(value);
    }

    get value() {
        return this._raw || [];
    }
    set value(values) {
        // Object case
        if(typeof(values) === 'object' && !Array.isArray(values)) {
            values = Object.entries(values).map(([key,e])=>typeof(e)==='object'
            ? {key, ...e}
            : e.includes(`${key}:`) ? e : `${key}:${e}`);
        } 
        this.set_multiline_value(values, ObjectItems.serialize);
    }

    get text() { return this.value.join('\n'); }
    set text(values) { this._raw = values.split('\n'); }
    get items() { return this.value.map(ObjectItems.parse).filter((it)=>it!=null); }
    set items(values) { this._raw = values.map(ObjectItems.serialize); }

    get dict() { 
        return Object.fromEntries(this._raw
            .map(ObjectItems.parse)
            .filter((it)=>it!=null)
            .map((it)=>[it.key, ObjectItems.serialize_dict(it)])
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