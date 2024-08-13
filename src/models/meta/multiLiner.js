import Liner from "./liner";
import Serializable from "./serializable";

export default class MultiLiner extends Serializable {
    constructor(value=[]) {
        super();
        this.value = value;
    }

    get value() {
        return this._raw || [];
    }
    set value(value) {
        this.set_multiline_value(value, Liner.serialize);
    }

    get text() { return this.value.join('\n'); }
    set text(values) { this._raw = values.split('\n'); }
    get items() { return this.value.map(Liner.parse); }
    set items(values) { this._raw = values.map(Liner.serialize); }
}