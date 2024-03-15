export default class Contact {
    static contribution_types = [
        'author',
        'maintainer',
        'contributor',
        'other',
    ]
    static _properties = [
        'name',
        'contribution',
        'contacts',
    ];

    constructor(options = {}) {
        Contact._properties.forEach((k)=>{
            this[k] = options[k] || null;
        });
    }
}