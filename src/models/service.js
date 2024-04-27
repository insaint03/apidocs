export default class Service {    
    constructor() {
        this._name = null;
        this._description = null;
        this._version = null;
        this._links = [];
        this._license = {};
        this._contributors = [];
    }

    get name() { return this._name; }
    set name(value) { this._name = value; }

    get description() { return this._description; }
    set description(value) { this._description = value; }

    get version() { return this._version; }
    set version(value) { this._version = value; }

    get links() { return this._links; }

    get license() { return this._license; }

    get contributors() { return this._contributors; }
}