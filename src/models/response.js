import Message from "./message";

export default class Response extends Message {
    static mime_types = [
        // text or text-based
        'plain/text',
        'application/html',
        'application/json',
        'application/xml',
        // multipart stream, download
        'multipart/mixed',
    ]

    constructor(mime_type, status=200) {
        super();
        this.headers['Content-Type'] = mime_type;
        this.status = null;
    }

    get definition() {
        return `${this.status}`;
    }
}