export default class Parameter {
    static _properties = [
        'name',
        'datatype',
        'summary',
        'description',
        'validation',
        'examples',
    ];

    static primitive_types = [
        // primitive datatypes
        'string',
        'number',
        'integer',
        // primitive collections
        'array',
        'object',
        // formatted 
        'decimal',
        'hex',
        'base64',
        'date',
        'time',
        'datetime',
        'timestamp',
        'timestamp_nano',
        'email',
        'uri',
        'phone',
        'uuid',
    ];

    static custom_types = {};

    static find(typename) {
        if(Parameter.primitive_types.includes(typename)) {
            return {name: typename};
        }
    }

    static validate_name(param, names) {
        if(Parameter.primitive_types.includes(param.name)
        || Parameter.custom_types[param.name]!=null
        || names.includes(param.name)) {
            throw new Error(`Parameter name ${param.name} is a reserved name.`);
        } else {
            // remove previous name if exists
            if(param._name != null) {
                delete Parameter.custom_types[param._name];
            }
            Parameter.custom_types[param.name] = param;
        }
    }

    static placements = [
        'path',
        'query',
        'header',
        'cookie',
        'body',
    ];

    static set_placement(param, place, required, default_value) {
        return {
            parameter: param,
            place, 
            required,
            defaults: default_value,
        }
    }

    constructor(options = {}) {
        // 
        this._name = null;
        
        Parameter._properties.forEach((k)=>{
            if(this[k] && this[k]!=options[k]) {
                this[k] = options[k];
            }
        });
        // TODO: name duplication check
        Parameter.validate_name(this);
    }

    get name() {
        return this._name;
    }

    set name(v) {
        Parameter.validate_name(v);
        this._name = v;
    }

    get is_primitive() {
        return Parameter.primitive_types.includes(this.datatype);
    }

    get is_formatted() {
        return this.is_primitive && !(this.datatype in [
            'string',
            'number',
            'integer',
            'array',
            'object',
        ]);
    }

    get is_array() {
        return this.datatype === 'array';
    }

    get is_object() {
        return this.datatype === 'object';
    }

    get item_types() {
        switch(this.datatype) {
            case 'array':
                return this._item_types || [];
            case 'object':
                return this._item_types || {};
            default:
                // TODO: throw exception warining
                return null;
        }
    }

    set item_types(value) {
        if(this.is_array || this.is_object) {
            this._item_types = value;
        } else {
            // TODO: throw exception warining
        }
    }
}