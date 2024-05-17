export default class Project {    
    constructor({name, description, version, links, license, contributors, keywords}) {
        this._name = name;
        this._description = description;
        this._version = version;
        this._links = links || [];
        this._license = license || '';
        this._contributors = contributors || [];
        this._keywords = keywords || [];
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

    get keywords() { return this._keywords; }
    set keywords(value) { 
        if(!Array.isArray(value)) {
            value = value.split(/[\s,]+/g);
        }
        this._keywords = value;
    }
}