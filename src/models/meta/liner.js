export default class Liner {
    static splitter = /(\([^)]*\)|<[^><]*>)/g;
    static keytype = /\((?<keytype>[^)]*)\)/;
    static links = /<(?<links>[^><]*)>/;

    static serialize_link({href, anchor}) {
        return anchor ? [href, anchor].join('|') : href;
    }

    static serialize({keytype, title, links, description}) {
        const puts = [keytype, title];
        if(links && 0<links.length) {
            puts.push(`<${links.map(Liner.serialize_link).join(',')}>`);
        }
        if(description) {
            puts.push(description);
        }
        return puts.join(' ');
    }

    static parse(line) {
        return line.split(Liner.splitter).reduce((agg, token)=>{
            token = token.trim();
            if(token.length<=0) { return agg; }
            const keymatch = Liner.keytype.exec(token);
            const linkmatch = Liner.links.exec(token);

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

}