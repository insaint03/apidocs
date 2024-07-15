export default class Serializable {
    constructor(value=null) {
        this._raw = value;
    }

    set_multiline_value(values, objSerializer) {
        if(typeof(values)==='string') {
            values = values.split('\n')
                .map((ln)=>ln.trim())
                .filter((ln)=>ln && 0<ln.length);
        }


        this._raw = values
            .filter((el)=>el!=null)
            .map((el)=>(typeof(el)==='object'?objSerializer(el):el))
            .filter((el)=>el!=null);
    }

    
    get value() {
        return this._raw;
    }
    set value(value) {
        this._raw = value;
    }
}