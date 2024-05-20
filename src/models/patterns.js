/**
 * naming pattern class
 */

export default class Patterns {
    
    // naming name.space.localname
    static naming = /^\s*((?<namespace>.*)\.)?(?<localname>.+)\s*$/;
    static naming_parse(token) {
        return token.match(Patterns.naming).groups;
    }
    
    static naming_serialize({namespace, localname}) {
        return `${namespace?namespace+'.':''}${localname}`;
    }
    
    // items of !key:datatype=defaults
    static item = /^(?<required>!)?(?<key>[^:]+):(?<datatype>[^=]+)(=(?<defaults>.+?))?$/;
    static item_parse(token) {
        const match = token.match(Patterns.item).groups;
        return {
            key: match.key,
            datatype: match.datatype,
            defaults: match.defaults,
            required: !!match.required,
        }
    }

    static item_serialize({key, datatype, defaults, required}) {
        return `${required?'!':''}${key}:${datatype}${defaults?`=${defaults}`:''}`;
    }

    static map_items(values) {
        // assert array
        if(!Array.isArray(values)) {
            return null;
        }
        return values.map((value)=>{
            switch(typeof value) {
                case 'string':
                    return Patterns.item_parse(value);
                case 'object':
                    return {
                        key: '',
                        datatype: null,
                        defaults: null,
                        required: false,
                        ...value,
                    }
                default:
                    return null;
            }
        })
        .filter((v)=>v!==null);
    }

    // request path
    static path_type = {
        parameter: 'parameter',
        extender: 'extender',
        text: 'text',
    };
    static path_parameter = /^<(?<datatype>[^=?]+)(?<optional>\?)?(=(?<defaults>.+))?>$/;
    static path_parse(frag) {
        let match;
        frag = (frag || '').trim();
        switch(true) {
            // datatype parameter
            case (match = Patterns.path_parameter.exec(frag)) !== null:
                return { 
                    type: 'parameter',
                    datatype: match.groups.datatype, 
                    defaults: match.groups.defaults || null,
                    optional: !!match.groups.optional || false,
                };
            // extending patterns
            case frag === '...':
                return {
                    type: 'extender',
                    matches: true,
                }
            default:
                return {
                    type: 'text',
                    text: frag,
                }
        }
    }
    static path_serialize(value) {
        switch(value.type) {
            case 'parameter':
                return `<${value.datatype}${value.optional?'?':''}${value.defaults?`=${value.defaults}`:''}>`;
            case 'extender':
                return '...';
            case 'text':
                return value.text;
            default:
                return '';
        }
    }

    // singleliner
    // (keytype) title <links|option_title,links> looooong description (singleine)
    static singleliner = /(\((?<keytype>[^)]+)\))?(?<title>[^<]+)(<(?<links>[^><]+)>)?(?<desc>[^><]+)?/;
    static singleliner_links = /^(?<href>[^|]+)(\|(?<title>[^,]+))?$/;
    static liner_parse(line) {
        const unmatched = {keytype: null, title: '', links: '', desc: ''};
        const match = (line.match(Patterns.singleliner) || {groups:unmatched}).groups;
        return {
            keytype: (match.keytype || '').trim(),
            title: match.title.trim(),
            links: (match.links || '').split(/,/g).map((ln)=>ln.trim())
                .map((ln)=>Patterns.singleliner_links.exec(ln))
                .filter((ln)=>ln!==null)
                .map((ln)=>ln.groups)
                .map(({href, title})=>({href, title:(title || href)})),
            description: (match.desc||'').trim(),
        }
    }
}