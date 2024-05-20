import Template from '@/models/template'
import { describe, expect, test } from "vitest";

describe('template model specifications', ()=>{
    // template class testcase

    describe('template properties', ()=>{
        // name, localname and namespaces
        test('simple name', ()=>{
            const tmpl = new Template('name')
            expect(tmpl.name).toBe('name');
            expect(tmpl.localname).toBe('name');
            expect(tmpl.namespace).toBe('');
        })
        test('namespaced', ()=>{
            const tmpl = new Template('ns.space.local')
            expect(tmpl.name).toBe('ns.space.local');
            expect(tmpl.localname).toBe('local');
            expect(tmpl.namespace).toBe('ns.space');
        
        })

        // description property
        test('singleine summary only', ()=>{
            const tmpl = new Template('name')
            tmpl.description = 'summary'
            expect(tmpl.description).toBe('summary')
        })

        // desciption multilines
        test('multiline description', ()=>{ 
            const tmpl = new Template('name')
            const desc = 'summary\n\nbody'
            tmpl.description = desc;
            expect(tmpl.description).toBe('summary\nbody');
            expect(tmpl.summary).toBe('summary');
            expect(tmpl.desc).toBe('body');
        });

        // extends.
        test('extending', ()=>{
            const parent = new Template('parent');
            const child =  new Template('child', parent.name);
            expect(child.extend).toBe(parent.name);
        });

        // extending hierarchy
        test('extending hierarchy', ()=>{
            const grandparent = new Template('grandparent');
            const parent = new Template('parent', grandparent.name);
            const child = new Template('child', parent.name);
            expect(child.extend).toBe(parent.name);
            expect(parent.extend).toBe(grandparent.name);
        });

        // overriding properties via extendings
        test('extending properties', ()=>{
            const grandparent = new Template('grandparent');
            grandparent.description = 'grandma';

            const parent = new Template('parent', grandparent.name);
            const child = new Template('child', parent.name);
            expect(child.description).toBe(grandparent.description);

            parent.description = 'mom';
            const sibling = new Template('sibling', parent.name);
            expect(sibling.description).toBe(parent.description);
            expect(sibling.extend).toBe(child.extend);
        });

        // request properties
        test('extending request method', ()=>{
            const parent = new Template('gets');
            parent.request.method = 'GET';
            const child = new Template('child', parent.name);
            expect(child.request.method).toBe('GET');

            child.request.method = 'POST';
            expect(child.request.method).toBe('POST');
            expect(parent.request.method).toBe('GET'); 
        });

        // request:path
        // request:method
        // request:query
        // request:cookies
        // request:headers
        // request:body

        // response properties

        // response:status
        // response:mimetype
        // response:cookies
        // response:headers
        // response:body



    })
});