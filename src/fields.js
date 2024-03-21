import Parameter from '@/models/parameter';
import Request from '@/models/request';
import Response from '@/models/response';
import Template from '@/models/template';

export default {
    parameters: [
        { key: 'name', label: 'Name', required: true, cols: 4 },
        { key: 'basistype', label: 'BaseType', required: true, is: 'parameter-picker',  cols: 4 },
        { key: 'schema', label: 'SchemaName', required: false },
        { key: 'summary', label: 'Summary', required: true },
        { key: 'description', label: 'Description', required: false },
        { key: 'validation', label: 'Validation', required: false },
        { key: 'items', label: 'Items', required: false },
        { key: 'samples', label: 'Samples', required: false },
    ],
    request: [
        { key: 'method', label: 'Method', required: true, is: 'v-select', items: Request.methods, cols: 4 },
        { key: 'path', label: 'Path', required: true, is:'path-editor', cols: 6},
        { key: 'summary', label: 'Summary', required: true },
        { key: 'description', label: 'Description', required: false },
        { key: 'query', label: 'Query', required: false, is: 'table-editor', },
        { key: 'cookies', label: 'Cookies', required: false, is: 'table-editor', },
        { key: 'headers', label: 'Headers', required: false, is: 'table-editor', },
        { key: 'body', label: 'Body', required: false, is: 'parameter-picker', },        
    ],
    response: [
        { key: 'mimetype', label: 'Mimetype', required: true, is: 'v-select', items: Response.mimetypes, cols: 4 },
        { key: 'status', label: 'Status', required: true, is: 'v-select', items: Response.statuses, cols: 4 },
        { key: 'summary', label: 'Summary', required: true },
        { key: 'description', label: 'Description', required: false },
        { key: 'cookies', label: 'Cookies', required: false, is: 'table-editor', },
        { key: 'headers', label: 'Headers', required: false, is: 'table-editor', },
        { key: 'body', label: 'Body', required: false, is: 'parameter-picker',},
    ],
    template: [
        { key: 'name', label: 'Name', required: true, cols: 4 },
        { key: 'tag', label: 'TagGroup', required: false, cols: 6},
        { key: 'summary', label: 'Summary', required: true },
        { key: 'description', label: 'Description', required: false },
        { key: 'inherit', label: 'Inherits', required: false, is: 'template-picker', cols: 4 },
        { key: 'request', label: 'Request', required: true, is: 'request-editor', cols: 6 },
        { key: 'response', label: 'Response', required: true, is: 'response-editor', cols: 6 },
    ],
    // table-editor row
    query: [
        { key: 'key', label: 'Key', required: true },
        { key: 'expect', label: 'Expect', required: true, is: 'v-select', items: Parameter.strings, },
        { key: 'required', label: 'Required', required: true, is: 'checkbox', },
        { key: 'default', label: 'Default', required: false },
        { key: 'inherit', label: 'Inherit', required: false, readonly: true, },
        { key: 'misc', label: 'Misc', required: false },
    ],
    cookie: [
        { key: 'key', label: 'Key', required: true },
        { key: 'expect', label: 'Expect', required: true, is: 'v-select', items: Parameter.strings, },
        { key: 'required', label: 'Required', required: true, is: 'checkbox', },
        { key: 'inherit', label: 'Inherit', required: false, readonly: true, },
        { key: 'misc', label: 'Misc', required: false },
    ],
    headers: [
        { key: 'key', label: 'Key', required: true },
        { key: 'expect', label: 'Expect', required: true, is: 'v-select', items: Parameter.strings, },
        { key: 'required', label: 'Required', required: true, is: 'checkbox', },
        { key: 'inherit', label: 'Inherit', required: false, readonly: true, },
        { key: 'misc', label: 'Misc', required: false },
    ],
}