import Liner from "./liner";
import Serializable from "./serializable";

export default class SingleLiner extends Serializable {
    constructor(value='') {
        super(value);
    }

    get text() {  return this.value; }
    set text(value) { this.value = value; }
    get item() { return Liner.parse(this.value); }
    set item(value) { this.value = Liner.serialize(value); }
}