import Serializable from "./serializable";
export default class ArrayItems extends Serializable {
    constructor(value=[]) {
        super(value);
    }

    get value() {
        return this._raw || [];
    }
    set value(values) {
        this._raw = values;
    }

    get text() { 
        return this.value.join('\n'); 
    }
    set text(values) { 
        this._raw = values.split('\n'); 
    }
    get items() { return this.value; }
    set items(values) { this._raw = values; }
}