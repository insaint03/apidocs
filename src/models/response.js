import Message from "./message";

export default class Response extends Message {
    static mimetypes = [
        // text or text-based
        'plain/text',
        'application/html',
        'application/json',
        'application/xml',
        // multipart stream, download
        'multipart/mixed',
    ]
    static statuses = {
        '100': {code: 100, title: 'Continue', desc: 'The server'},
        '101': {code: 101, title: 'Switching Protocols', desc: 'The server'},
        '102': {code: 102, title: 'Processing', desc: 'The server'},
        '103': {code: 103, title: 'Early Hints', desc: 'The server'},
        '200': {code: 200, title: 'OK', desc: 'The request has succeeded.'},
        '201': {code: 201, title: 'Created', desc: 'The request has been fulfilled and has resulted in one or more new resources being created.'},
        '202': {code: 202, title: 'Accepted', desc: 'The request has been accepted for processing, but the processing has not been completed.'},
        '203': {code: 203, title: 'Non-Authoritative Information', desc: 'The server is a transforming proxy that received a 200 OK from its origin, but is returning a modified version of the origin\'s response.'},
        '204': {code: 204, title: 'No Content', desc: 'The server successfully processed the request and is not returning any content.'},
        '205': {code: 205, title: 'Reset Content', desc: 'The server successfully processed the request, but is not returning any content.'},
        '206': {code: 206, title: 'Partial Content', desc: 'The server is delivering only part of the resource due to a range header sent by the client.'},
        '207': {code: 207, title: 'Multi-Status', desc: 'The message body that follows is an XML message and can contain a number of separate response codes, depending on how many sub-requests were made.'},
        '208': {code: 208, title: 'Already Reported', desc: 'The members of a DAV binding have already been enumerated in a previous reply to this request, and are not being included again.'},
        '226': {code: 226, title: 'IM Used', desc: 'The server has fulfilled a GET request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.'},
        '300': {code: 300, title: 'Multiple Choices', desc: 'Indicates multiple options for the resource from which the client may choose.'},
        '301': {code: 301, title: 'Moved Permanently', desc: 'This and all future requests should be directed to the given URI.'},
        '302': {code: 302, title: 'Found', desc: 'The resource was found at a different URI.'},
        '303': {code: 303, title: 'See Other', desc: 'The response to the request can be found under another URI using a GET method.'},
        '304': {code: 304, title: 'Not Modified', desc: 'Indicates that the resource has not been modified since the version specified by the request headers If-Modified-Since or If-None-Match.'},
        '305': {code: 305, title: 'Use Proxy', desc: 'The requested resource is available only through a proxy, the address for which is provided in the response.'},
        '306': {code: 306, title: 'Switch Proxy', desc: 'No longer used.'},
        '307': {code: 307, title: 'Temporary Redirect', desc: 'The request should be repeated with another URI; however, future requests should still use the original URI.'},
        '308': {code: 308, title: 'Permanent Redirect', desc: 'The request and all future requests should be repeated using another URI.'},
        '400': {code: 400, title: 'Bad Request', desc: 'The server cannot or will not process the request due to an apparent client error.'},
        '401': {code: 401, title: 'Unauthorized', desc: 'Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided.'},
        '402': {code: 402, title: 'Payment Required', desc: 'The content available on the server requires payment.'},
        '403': {code: 403, title: 'Forbidden', desc: 'The request was valid, but the server is refusing action.'},
        '404': {code: 404, title: 'Not Found', desc: 'The requested resource could not be found but may be available in the future.'},
        '405': {code: 405, title: 'Method Not Allowed', desc: 'A request method is not supported for the requested resource; for example, a GET request on a form that requires data to be presented via POST, or a PUT request on a read-only resource.'},
        '406': {code: 406, title: 'Not Acceptable', desc: 'The requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request.'},
        '407': {code: 407, title: 'Proxy Authentication Required', desc: 'The client must first authenticate itself with the proxy.'},
        '408': {code: 408, title: 'Request Timeout', desc: 'The server timed out waiting for the request.'},
        '409': {code: 409, title: 'Conflict', desc: 'Indicates that the request could not be processed because of conflict in the request, such as an edit conflict between multiple simultaneous updates.'},
        '410': {code: 410, title: 'Gone', desc: 'Indicates that the resource requested is no longer available and will not be available again.'},
        '411': {code: 411, title: 'Length Required', desc: 'The request did not specify the length of its content, which is required by the requested resource.'},
        '412': {code: 412, title: 'Precondition Failed', desc: 'The server does not meet one of the preconditions that the requester put on the request.'},
        '413': {code: 413, title: 'Payload Too Large', desc: 'The request is larger than the server is willing or able to process.'},
        '414': {code: 414, title: 'URI Too Long', desc: 'The URI provided was too long for the server to process.'},
        '415': {code: 415, title: 'Unsupported Media Type', desc: 'The request entity has a media type which the server or resource does not support.'},
        '416': {code: 416, title: 'Range Not Satisfiable', desc: 'The client has asked for a portion of the file, but the server cannot supply that portion.'},
        '417': {code: 417, title: 'Expectation Failed', desc: 'The server cannot meet the requirements of the Expect request-header field.'},
        '418': {code: 418, title: 'I\'m a teapot', desc: 'The server'},
        '421': {code: 421, title: 'Misdirected Request', desc: 'The request was directed at a server that is not able to produce a response.'},
        '422': {code: 422, title: 'Unprocessable Entity', desc: 'The request was well-formed but was unable to be followed due to semantic errors.'},
        '423': {code: 423, title: 'Locked', desc: 'The resource that is being accessed is locked.'},
        '424': {code: 424, title: 'Failed Dependency', desc: 'The request failed due to failure of a previous request.'},
        '425': {code: 425, title: 'Too Early', desc: 'Indicates that the server is unwilling to risk processing a request that might be replayed.'},
        '426': {code: 426, title: 'Upgrade Required', desc: 'The client should switch to a different protocol such as TLS/1.0.'},
        '428': {code: 428, title: 'Precondition Required', desc: 'The origin server requires the request to be conditional.'},
        '429': {code: 429, title: 'Too Many Requests', desc: 'The user has sent too many requests in a given amount of time.'},
        '431': {code: 431, title: 'Request Header Fields Too Large', desc: 'The server'},
        '451': {code: 451, title: 'Unavailable For Legal Reasons', desc: 'The user requests an illegal resource, such as a web page censored by a government.'},
        '500': {code: 500, title: 'Internal Server Error', desc: 'A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.'},
        '501': {code: 501, title: 'Not Implemented', desc: 'The server either does not recognize the request method, or it lacks the ability to fulfill the request.'},
        '502': {code: 502, title: 'Bad Gateway', desc: 'The server'},
        '503': {code: 503, title: 'Service Unavailable', desc: 'The server is currently unavailable (because it is overloaded or down for maintenance).'},
        '504': {code: 504, title: 'Gateway Timeout', desc: 'The server'},
        '505': {code: 505, title: 'HTTP Version Not Supported', desc: 'The server does not support the HTTP protocol version used in the request.'},
        '506': {code: 506, title: 'Variant Also Negotiates', desc: 'Transparent content negotiation for the request results in a circular reference.'},
        '507': {code: 507, title: 'Insufficient Storage', desc: 'The server is unable to store the representation needed to complete the request.'},
        '508': {code: 508, title: 'Loop Detected', desc: 'The server'},
        '510': {code: 510, title: 'Not Extended', desc: 'Further extensions to the request are required for the server to fulfill it.'},
        '511': {code: 511, title: 'Network Authentication Required', desc: 'The client'},
    };

    static get status_most() {
        return ['200', '301', '303', '400', '401', '403', '404', '500', '501'].map((c)=>({code: parseInt(c), ...Response.statuses[`${c}`]}));
    }

    static get status_all() {
        return Object.entries(Response.statuses).map(([code, data])=>({code: parseInt(code), ...data}));
    }

    constructor(option={}, ...templates) {
        const tmpls = templates.map((t)=>t.response);
        const {mimetype, status, headers, cookies, body, description} = Response.merge(...tmpls, option);

        super({headers, cookies, body, description}, ...templates);
        this._mtype = mimetype || 'application/json';
        this.status = status || '200';
    }

    get definition() {
        return `${this.status}`;
    }

    get status() {
        return this._status.code;
    }
    get status_code() {
        return parseInt(this._status.code);
    }
    get status_title() {
        return this._status.title;
    }
    get status_desc() {
        return this._status.desc;
    }
    set status(value) {
        value = (value || '').toString();
        // code first
        this._status = Response.statuses[value];
        if(this._status == null) {
            const exact = new RegExp(`^${value}$`, 'i');
            const partial = new RegExp(value, 'i');
            this._status = Response.status_all.find((s)=>exact.test(s.title))
                || Response.status_all.find((s)=>partial.test(s.title))
                || null;
        }
    }

    get mimetype() {
        return this._mtype;
    }

    set mimetype(value) {
        this._mtype = value;
    }

    get serialized() {
        return {
            mimetype: this.mimetype,
            status: this.status,
            ...super.serialized,
        }
    }

    static option() {
        return {
            mimetype: null,
            status: null,
            headers: [],
            cookies: [],
            // body type constraints
            body: [],
        };
    }

    static option_serialize(loads) {
        const {
            mimetype, status,
        } = loads;
        const ret = {
            mimetype,
            status,
        };
        ['headers', 'cookies', 'body'].forEach((key)=>{
            if(loads[key] && loads[key].length>0) {
                ret[key] = loads[key];
            }
        });
        return ret;
    }

    static merge(...resps) {
        return resps.reduce((agg, resp)=>{
            return {
                mimetype: agg.mimetype || resp.mimetype,
                status: agg.status || resp.status,
                headers: (agg.headers || []).concat(resp.headers || [])
                    .filter((h,i,a)=>a.indexOf(h)===i), // unique
                cookies: {...agg.cookies, ...resp.cookies},
                body: resp.body || agg.body,
            }
        }, Response.option());
    }
}