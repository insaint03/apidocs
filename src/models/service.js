export default class Service {
    static _properties = [
        'name',
        'url',
        'summary',
        'description',
        'version',
        'contacts',
        'license',

        // api doc elements
        'templates',
        'parameters',
        'entries',
    ];
    
    constructor(options = {}) {
        Service._properties.forEach((k)=>{
            this[k] = options[k] || null;
        });
    }
}