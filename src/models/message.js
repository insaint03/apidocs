export default class Message {
    // static http = 'HTTP/1.1';

    constructor() {
        this._headers = [];
        this._cookies = {};
        this._body = null;
    }

    get headers() {
        return this._headers.concat(
            Object.entries(this.cookies).map(([key, v])=>({key: 'cookie', cookie: key, ...v}))
        );
    }

    add_header(key, datatype, defaults, required) {
        this._header.push({key, datatype, defaults, required});
    }

    headers_of(key) {
        let keysearch = key.toLowerCase();
        return this.headers.filter((h)=>h.key.toLowerCase() === keysearch);
    }

    count_headers(key) {
        return this.headers_of(key).length;
    }
    

    get cookies() {
        return this._cookies;
    }

    put_cookie(key, datatype, defaults, required) {
        this._cookies[key] = { datatype, defaults, required };
    }

    remove_cookie(key) {
        delete this._cookies[key];
    }
}