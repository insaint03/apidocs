import Descriptable from './descriptable';
import Patterns from './patterns'

export default class Project extends Descriptable {    
    constructor({name, description, version, history, links, license, contributors, keywords}={}) {
        super({desc: description});

        this.name = name || '';
        this.version = version;
        this.history = history;
        this.links = links || [];
        this.license = license || '';
        this.contributors = contributors || [];
        this.keywords = keywords || [];
    }

    get name() { return this._name; }
    set name(value) { this._name = value; }

    get version() { return this._version; }
    set version(value) { this._version = value; }

    get links() { return this._links }
    get links_string() { return this._links.map(Patterns.liner_serialize).join('\n'); }
    set links(value) { 
        const stringify = Array.isArray(value)? value.join('\n'): (value || '');
        this._links = stringify.split('\n').map(Patterns.liner_parse); 
    }

    get license() { return this._license; }
    get license_string() { return Patterns.liner_serialize(this._license); }
    set license(value) { this._license = Patterns.liner_parse(value.trim()); }

    get contributors() { return this._contributors; }
    get contributors_string() { 
        return this._contributors.map(Patterns.liner_serialize).join('\n'); }
    
    set contributors(value) { 
        const stringify = Array.isArray(value)? value.join('\n'): (value || '');
        this._contributors = stringify.split('\n').map(Patterns.liner_parse); 
    }

    // history contains: version, date, items (single-liner)
    get history() { return this._history || []; }
    set history(value) { 
        if(value) {
            this.history_log(value); 
        }
    }
    // history only appends
    history_log({version, date, items}) { 
        // single_history: {version:str, date:str(ISO Format), items:array(liners)}
        version = version || this._version;
        // find the version item from concurrent history
        let it = this.history.find((h)=>h.version===version);
        let created = false;
        // create a new history if not found
        if(!it) {
            it = {version,};
            created = true;
        }

        // overwrite the date if needed
        it.date = date || new Date().toISOString();
        it.items = (it.items || [])
            .concat((items instanceof Array?items:(items||'').split('\n'))
                .map((ln)=>ln instanceof String?Patterns.liner_parse(ln):ln));
        // 
        if(created) {
            this._history = this.history.concat([it]);
        }
    }

    get keywords() { return this._keywords; }
    set keywords(value) { 
        if(!Array.isArray(value)) {
            value = value.split(/[\s,]+/g);
        }
        this._keywords = value;
    }
}