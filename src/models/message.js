export default class Message {
    static http = 'HTTP/1.1';

    constructor() {
        this.headers = [];
        this.cookies = {};
        this.body = null;
        this.placements = [];
    }

    get definition() {
        // throw abstraction warning
        return '';
    }
}