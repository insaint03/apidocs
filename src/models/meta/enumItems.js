import Serializable from "./serializable";

export default class EnumItems extends Serializable {
    static pattern = /^(?<value>[^\s])\s+(?<desc>.*)$/;
    static serialize({value, desc}) {
        return [
            value,
            ' ',
            desc,
        ].join('');
    }

    static parse(line) {
        const match = line.match(EnumItems.pattern);
        return match ? match.groups : null;
    }

    constructor(value=[]) {
        super(value);
    }

    get value() {
        return this._raw || [];
    }

    set value(values) {
        this.set_multiline_value(values, EnumItems.serialize);
    }

    get text() { return this.value.join('\n'); }
    set text(values) { this._raw = values.split('\n'); }
    get items() { return this.value.map(EnumItems.parse).filter((it)=>it!=null); }
    set items(values) { this._raw = values.map(EnumItems.serialize); }

    get dict() { return this.value; }
}