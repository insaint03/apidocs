import Descriptable from './descriptable';
// import Patterns from './patterns'

import Name from './meta/name';
import Liner from './meta/liner';
import SingleLiner from './meta/singleLiner';
import MultiLiner from './meta/multiLiner';
import ArrayItems from './meta/arrayItems';


export default class Project extends Descriptable {
    constructor({name, description, version, history, links, license, terms, contributors, keywords}={}) {
        super({desc: description});

        this._name = new Name(name);
        this.version = version || '';
        this._links = new MultiLiner(links);
        this._license = new SingleLiner(license);
        this._terms = new MultiLiner(terms);
        this._contributors = new MultiLiner(contributors);
        this._keywords = new ArrayItems(keywords);
        this._history = history || [];
    }

    /* name related fields */
    get name(){ return this._name.value; }
    get localname() { return this._name.localname; }
    get namespace() { return this._name.namespace; }
    set name(value) { this._name.value = value; }

    /* link: liner items */
    get links() { return this._links.value }
    get links_text() { return this._links.text; }
    get link_items() { return this._links.items; }
    set links(value) { this._links.value = value; }
    set links_text(value) { this._links.text = value; }
    set link_items(value) { this._links.items = value; }
    
    /* license: singe-line liner item */
    get license() { return this._license.value; }
    get license_text() { return this._license.text; }
    get license_item() { return this._license.item; }
    set license(value) { this._license.value = value; }
    set license_text(value) { this._license.text = value;}
    set license_item(value) { this._license.item = value; }

    /* terms: liner item */
    get terms() { return this._terms.value; }
    get terms_text() { return this._terms.text; }
    get term_items() { return this._terms.items; }
    set terms(value) { this._terms.value = value; }
    set terms_text(value) { this._terms.text = value; }
    set term_items(value) { this._terms.items = value; }

    /* contributors: liner item */
    get contributors() { return this._contributors.value; }
    get contributors_text() { return this._contributors.text; }
    get contributor_items() { return this._contributors.items; }
    set contributors(value) { this._contributors.value = value; }
    set contributors_text(value) { this._contributors.text = value; }
    set contributor_items(value) { this._contributors.items = value; }

    /* keywords: arrayItems item */
    get keywords() { return this._keywords.value; }
    get keyword_text() { return this.keywords.join(','); }
    set keywords(values) { this._keywords.value = values; }
    set keyword_text(value) { this._keywords.value = value.split(/\s*,\s*/g); }


    // history contains: version, date, items (single-liner)
    get history() { return this._history || []; }
    get history_text() {
        return this.history.map(({version, date, items})=>({
            version,
            date,
            items: (items||[]).map(Liner.serialize),
        }));
    }
    set history(value) { 
        if(value) {
            this.history_log(value); 
        }
    }
    get history_items() {
        return Object.fromEntries(this.history.map(({version, date, items})=>[
            version,
            {version, date, items},
        ]));
    }

    get serialized() {
        return {
            name: this.name,
            // description: this.description,
            version: this.version,
            history: this.history_text,
            links: this.links_text,
            license: this.license_text,
            contributors: this.contributors_text,
            // keywords: this.keywords,
            ...super.serialized,
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
            .concat(
                (items instanceof Array?items:(items||'').split('\n'))
                .map(Liner.parse));
        // 
        if(created) {
            this._history = this.history.concat([it]);
        }
    }
}