export default class Serializable {
    constructor(value=null) {
        this._raw = value;
    }

    set_multiline_value(values, objSerializer) {
        this._raw = Array.isArray(values)
            // case array 
            ? values.map((el)=>
                // element string or object
                (typeof(el)==='object'?objSerializer(el):el))
            // case multiline string
            : typeof(values) === 'string'
                ? values.split('\n')
                : null;
    }

    
    get value() {
        return this._raw;
    }
    set value(value) {
        this._raw = value;
    }
}