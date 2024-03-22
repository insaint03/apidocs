import Message from './message.js';
// import Parameter from './parameter.js';


export default class Request extends Message {
    static methods = [
        'GET',
        'POST',
        'PUT',
        'DELETE',
        'PATCH',
        'OPTIONS',
        'HEAD',
        'CONNECT',
        'TRACE',
    ];

    static _path_placement_required = /<(.+)>/;
    static _path_placement_optional = /\[(.+)\]/;


    constructor(method, path, query) {
        super();
        this.method = method;
        this._fragments = [];
        this._query = query || null;

        // TODO: parse path placements
        // TODO: parse query placements
    }


    get definition() {
        return `${this.method} ${this.path} ${Message.http}`;
    }

    get fragments() {
        return this._fragments.map((f)=>{
            return f.name || f;
        });
    }
    get path() {
        return `/${this.fragments.join('/')}`;
    }

    set path(v) {
        // compare fragments
        // let tokens = v.split('/');
        // tokens.forEach((token, ti)=>{
        //     let frag = this._fragments[ti] || null;
            
        // })
        this._fragments = v.split('/');

    }

    get query() {
        return null;
        // return this.query==null 
        //     ? null
        //     : `?${Object.entries(this.query).map(([k,v])=>`${k}=${v}`).join('&')}`;
    }

    set query(v) {

    }
}