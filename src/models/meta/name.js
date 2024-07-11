import Serializable from './serializable.js';

export default class Name extends Serializable {
    static pattern = /^\s*((?<namespace>.*)\.)?(?<localname>.+)\s*$/;
    constructor(value='') {
        super(value);
    }

    get match() {
        return this.value.match(Name.pattern).groups || {};
    }

    get namespace() {
        return this.match.namespace || '';
    }

    get localname() {
        return this.match.localname || '';
    }
}