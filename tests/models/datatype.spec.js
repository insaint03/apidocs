import NameDuplication from "@/exceptions/NameDuplication";
import ValueNotFound from "@/exceptions/ValueNotFound";
import Datatype from "@/models/datatype";
import { describe, expect, test } from "vitest";

describe('datatype model specifications', ()=>{

    const rname = (prefix)=>`${prefix || ''}_${Math.random().toString(36).substring(2)}`;

    // class features & storages
    describe('test class features and storage listing', ()=>{
        test('all stored', ()=>{
            expect(Datatype.all.length).toBeGreaterThan(0);
        });
        test('appending type', ()=>{
            const dts = [
                Datatype.create(rname('test'), 'string'),
                new Datatype(rname('test2'), 'object'),
            ];
    
            dts.forEach((dt)=>{
                expect(dt).toBeInstanceOf(Datatype);
                expect(Datatype.find(dt.name, true)).toBe(dt);
            });  
        });
        test('name duplications', ()=>{
            const thename = rname('test');
            const dt = Datatype.create(thename, 'string');
            expect(dt).toBeInstanceOf(Datatype);
            expect(()=>new Datatype(thename, 'string')).toThrow(NameDuplication);
        });
        test('name deduplication on create', ()=>{
            const thename = rname('test');
            const ctrl = Datatype.create(thename, 'string');
            const exp = Datatype.create(thename, 'object');
            expect(ctrl.name).toBe(thename);
            expect(exp.name).not.toBe(thename);
            expect(ctrl).toBeInstanceOf(Datatype);
            expect(exp).toBeInstanceOf(Datatype);
        });
        test('non-existing basis type', ()=>{
            expect(()=>Datatype.create(rname('test'), 'this.will.never.be.exists')).toThrowError(ValueNotFound);
        });
    
        // list and find
        test('find by name', ()=>{
            expect(Datatype.find('string').name).toBe('string');
            expect(Datatype.find('object').name).toBe('object');
        });
        test('find by name, nonexists naive', ()=>{
            expect(Datatype.find('this.will.never.be.exists')).toBeNull();
            expect(Datatype.find('this.will.never.be.exists', false)).toBeNull();
        });
        test('find by name, nonexists at must', ()=>{
            expect(()=>Datatype.find('this.will.never.be.exists', true)).toThrowError(ValueNotFound);
        });
    });

    describe('tests properties', ()=>{

        // properties:name
        test('simple name', ()=>{
            const thename = rname('test');
            const dt = new Datatype(thename);
            expect(dt.name).toBe(thename);
        });
    
        test('namespaced', ()=>{
            const namepspace = 'ns.group';
            const localname = 'test';
            const fullname = `${namepspace}.${localname}`;
            const dt = new Datatype(fullname);
            
            // test namespace
            expect(dt.namespace).toBe(namepspace);
            // test localname
            expect(dt.localname).toBe(localname);
        });
        // properties:basis/origin type
        test('basis string', ()=>{
            const thename = rname('test');
            const dt = new Datatype(thename, 'string');
            expect(dt.basistype).toBe('string');
            expect(dt.basis).toBe(Datatype.find('string'));
        });
    
        test('basis array', ()=>{
            const thename = rname('test');
            const dt = new Datatype(thename, 'array');
            expect(dt.basistype).toBe('array');
            expect(dt.basis).toBe(Datatype.find('array'));
        });
    
        test('basis object', ()=>{ 
            const thename = rname('test');
            const dt = new Datatype(thename, 'object');
            expect(dt.basistype).toBe('object');
            expect(dt.basis).toBe(Datatype.find('object'));
        });
    
        test('origins', ()=>{
            Datatype.origins.forEach((p)=>{
                expect(p.is_origin).toBeTruthy();
                expect(p.is_primitive).toBeTruthy();
                expect(p.basistype).toBe(null);
                expect(p.origintype).toBe(p.name);
                expect(p.origin, `ptype ${p.name}`).toBe(p);
            });
        });

        test('nested origins', ()=>{
            const names = [
                rname('test'),
                rname('test'),
                rname('test'),
            ];
            const origins = 'object';
            const results = names.map((n, ni)=>Datatype.create(n, 1<ni ? names[ni-1] : origins));
            results.forEach((rs, i)=>{
                expect(rs.name).toBe(names[i]);
                expect(rs.basistype).toBe(1<i ? names[i-1] : origins);
                expect(rs.origintype).toBe(origins);
            });
        });

        test('nested origin changes', ()=>{
            const str_name = [
                rname('str'),
                rname('str'),
                rname('str'),
            ];
            const arr_name = [
                rname('arr'),
                rname('arr'),
                rname('arr'),
            ];
            const strs = [
                Datatype.create(str_name[0], 'string'),
                Datatype.create(str_name[1], str_name[0]),
                Datatype.create(str_name[2], str_name[1]),
            ];
            const arrs = [
                Datatype.create(arr_name[0], 'array'),
                Datatype.create(arr_name[1], arr_name[0]),
                Datatype.create(arr_name[2], arr_name[1]),
            ];

            // prev condition check
            str_name.forEach((n)=>{
                const dt = Datatype.find(n);
                expect(dt.origintype).toBe('string');
            });
            arr_name.forEach((n)=>{
                const dt = Datatype.find(n);
                expect(dt.origintype).toBe('array');
            });

            // update values then test origin
            strs[2].basistype = arrs[2];
            // now strs[2] origin should be array
            // + array > arr[0] > arr[1] > arr[2] > str[2]
            // + string > str[0] > str[1]
            expect(strs[2].origintype).toBe('array');
            // update arr[0] to be string
            // then all type should be string originatdes
            // + array >(none)
            // + string > str[0] > str[1], arr[1] > ...
            arrs[0].basistype = strs[0];
            arrs.forEach((a)=>{
                expect(a.origintype).toBe('string');
            });
            strs.forEach((s)=>{
                expect(s.origintype).toBe('string');
            });
        });


        // description
        test('description', ()=>{
            const thename = rname('test');
            const desc = rname('desc');
            const dt = new Datatype(thename, 'string');
            dt.description = desc;
            expect(dt.description).toBe(desc);
        });
    
        // items
        test('items for collective', ()=>{
            expect(Datatype.find('array')).not.toBe(null);
            expect(Datatype.find('object').items).not.toBe(null);
            expect(Datatype.find('string').items).toBe(null);
            expect(Datatype.find('number').items).toBe(null);
        });

        test('get/set items at non-collective', ()=>{
            const thename = rname('test');
            const dt = new Datatype(thename, 'string');
            expect(dt.parse_add_item('tests', '1','2','3')).toBeNull();
        });

        test('get items at array', ()=>{
            const thename = rname('test');
            const dt = new Datatype(thename, 'array');
            const testset = [
                rname('a'),
                rname('b'),
                rname('c'),
            ];
            dt.items = testset;
            // test items
            testset.forEach((v,i)=>{
                // test auto generate
                expect(Datatype.name_exists(v)).toBeTruthy();
                expect(v).toBe(dt.items[i]);
            });
        });

        test('object items gets and sets', ()=>{
            const testset = {
                // required key 'firts' string datatype
                '!first:string': {key: 'first', required: true, datatype: 'string', defaults: undefined},
                // optional key 'second' number datatype
                'second:number': {key: 'second', required: false, datatype: 'number', defaults: undefined},
                // required key 'third' boolean datatype, defaults to false
                '!third:boolean=false': {key: 'third', required: true, datatype: 'boolean', defaults: 'false'},
                // optional key 'fourth' integer datatype, defaults to 0
                'fourth:integer=0': {key: 'fourth', required: false, datatype: 'integer', defaults: '0'},
            }

            Object.entries(testset).forEach(([k,v])=>{
                // feed forward
                expect(Datatype.item_convention(k)).to.contain(v);
                // feed backward
                expect(Datatype.item_object_stringify(v)).to.contain(k);
            });

        });

        test('get items at object', ()=>{
            const thename = rname('test');
            const dt = new Datatype(thename, 'object');
            const testset = [
                // required string 'first'
                'first:string',
                // optional number 'second'
                'second:number',
                // required boolean 'third' defaults to be false
                '!third:boolean=false',
                // optional integer 'fourth' defaults to be 0
                'fourth:integer=0',
            ];
            dt.items = testset;
            expect(dt.items.length).toBe(testset.length);
            expect(dt._items[0]).to.contain({
                key: 'first',
                datatype: 'string',
                required: false,
            });
            expect(dt._items[1]).to.contain({
                key: 'second',
                datatype: 'number',
                required: false,
            });
            expect(dt._items[2]).to.contain({
                key: 'third',
                datatype: 'boolean',
                required: true,
                defaults: 'false',
            });
            expect(dt._items[3]).to.contain({
                key: 'fourth',
                datatype: 'integer',
                required: false,
                defaults: '0',
            });
        })
    
        // examples
        test('examples', ()=>{
            const thename = rname('test');
            const dt = new Datatype(thename, 'string');
            const testset = [
                rname('a'),
                rname('b'),
                rname('c'),
            ];
            dt.examples = testset;
            expect(dt.examples.length).toBe(testset.length);
            // test items
            testset.forEach((v,i)=>{
                expect(v).toBe(dt.examples[i]);
            });
        });
    
        // migration
        test('migration name', ()=>{
            const thename = rname('test');
            const dt = new Datatype(thename, 'string');
            const mname = `${thename}_migration`;
            expect(dt.migration).to.equal(null);

            dt.migration = mname;
            expect(dt.migration).toBe(mname);
        });
    
        // validation rules
        test('validation rules', ()=>{
            const thename = rname('test');
            const dt = new Datatype(thename, 'string');
            expect(dt.validation).toBe(null);
            // test items
            dt.validation = `(()=>true)`;
            expect(dt.validation).not.toBeNull();
        });
    });

    describe('test sophisticated hierarchies', ()=>{
        // test children
        test('children', ()=>{
            const parent = new Datatype(rname('parent'), 'object');
            const children = new Array(10)
                .fill(null)
                .map(()=>new Datatype(rname('child'), parent.name));
            expect(parent.children).toBeInstanceOf(Array);
            expect(parent.children.length).toBe(children.length);
            children.forEach((child)=>{
                expect(parent.children).toContain(child);
            });
        });

        // TODO: test upstream go over

        // TODO: test hierarhy

        // TODO: list descendants

        // TODO: list containers

        // TODO: list relatives
    })
});