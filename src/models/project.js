export default class Project {    
    constructor({name, description, version, history, links, license, contributors, keywords}) {
        this._name = name;
        this._description = description;
        this._version = version;
        this._history = history || [];
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
    set links(value) { this._links = value; }

    get license() { return this._license; }
    set license(value) { this._license = value; }

    get contributors() { return this._contributors; }
    set contributors(value) { this._contributors = value; }

    // history contains: version, date, items (single-liner)
    get history() { return this._history; }
    // history only appends
    set history(value) { this._history = this._history.concat(value); }

    get keywords() { return this._keywords; }
    set keywords(value) { 
        if(!Array.isArray(value)) {
            value = value.split(/[\s,]+/g);
        }
        this._keywords = value;
    }
}