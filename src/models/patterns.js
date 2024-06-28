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
    static _item_enum_split = /^(?<value>[^\s])\s+(?<desc>.*)$/
    static item_parse_enum(token) {
        // on enum, split first space (and/or common delimiters)
        //  into value, and its description
        const match = Patterns._item_enum_split.exec(token)
        return match ? {...match.groups} : null;
    }
    // item key mapping
    static item_items = {itemId: 'key', itemTitle: 'key', itemSubtitle: 'datatype' };

    static item_serialize({key, datatype, defaults, required}) {
        return `${required?'!':''}${key}:${datatype}${defaults?`=${defaults}`:''}`;
    }
    static item_serialize_enum({value, desc}) {
        return `${value} ${desc}`;
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
    static liner_spliter = /(\([^)]*\)|<[^><]*>)/g;
    static liner_keytype = /\((?<keytype>[^)]*)\)/;
    static liner_links = /<(?<links>[^><]*)>/;
    // static singleliner = /(\((?<keytype>[^)]+)\))?(?<title>[^<]+)(<(?<links>[^><]+)>)?(?<desc>[^><]+)?/;
    // static singleliner_links = /^(?<href>[^|]+)(\|(?<title>[^,]+))?$/;
    static liner_parse(line) {
        return line.split(Patterns.liner_spliter).reduce((agg, token)=>{
            token = token.trim();
            if(token.length<=0) { return agg; }
            const keymatch = Patterns.liner_keytype.exec(token);
            const linkmatch = Patterns.liner_links.exec(token);

            if(keymatch && agg.keytype==null) {
                agg.keytype = keymatch.groups.keytype;
            }
            else if(linkmatch) {
                const links = linkmatch.groups.links.split(/[,\n*]+/g)
                    .map((ln)=>ln.split(/\|/).map((t)=>t.trim()).filter((t)=>t))
                    .map(([href,anchor,])=>({href, anchor: anchor || href}));
                agg.links = (agg.links || []).concat(links)
                    .filter((ln)=>ln.href!=null);
            } else if(agg.title.length<=0) {
                agg.title = token;
            } else {
                agg.description += token;
            }
            return agg;
        }, {
            keytype: null,
            title: '',
            links: [],
            description: '',
        });
    }
    static liner_serialize({keytype, title, links, description}) {
        return [
            keytype?`(${keytype})`:'',
            title,
            links?`<${links.map((ln)=>`${ln.href}${ln.anchor!==ln.href?'|'+ln.anchor:''}`).join(',')}>`:'',
            description,
        ].join(' ');
    }
    static liner_items = {itemTitle: 'title', itemSubtitle: 'keytype', itemLinks: 'links', itemDesc: 'description', };
}