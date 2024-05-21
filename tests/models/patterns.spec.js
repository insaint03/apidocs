import Patterns from "@/models/patterns";
import { describe, test, expect } from "vitest";

describe('Test patterns model', () => {
    describe('naming patterns', ()=>{
        test('tests naming pattern parsing', ()=>{
            expect(Patterns.naming_parse('localname'))
                .to.contain({localname: 'localname'});
            expect(Patterns.naming_parse('ns.localname'))
                .toEqual({namespace: 'ns', localname: 'localname'});
            expect(Patterns.naming_parse('ns1.ns2.localname'))
                .toEqual({namespace: 'ns1.ns2', localname: 'localname'});
        });
    
        test('tests naming pattern serialization', ()=>{
            expect(Patterns.naming_serialize({localname: 'localname'}))
                .toEqual('localname');
            expect(Patterns.naming_serialize({namespace: 'ns', localname: 'localname'}))
                .toEqual('ns.localname');
            expect(Patterns.naming_serialize({namespace: 'ns1.ns2', localname: 'localname'}))
                .toEqual('ns1.ns2.localname');
        });
    });

    describe('item patterns', ()=>{
        test('tests item pattern parsing', ()=>{
            expect(Patterns.item_parse('key:datatype'))
                .toEqual({key: 'key', datatype: 'datatype', required: false});
            expect(Patterns.item_parse('key:datatype=default'))
                .toEqual({key: 'key', datatype: 'datatype', defaults: 'default', required: false});
            expect(Patterns.item_parse('!key:datatype=default'))
                .toEqual({key: 'key', datatype: 'datatype', defaults: 'default', required: true});
        });
    
        test('tests item pattern serialization', ()=>{

        expect(Patterns.item_serialize({key: 'key', datatype: 'datatype'}))
            .toEqual('key:datatype');
        expect(Patterns.item_serialize({key: 'key', datatype: 'datatype', defaults: 'default'}))
            .toEqual('key:datatype=default');
        expect(Patterns.item_serialize({key: 'key', datatype: 'datatype', required: true}))
            .toEqual('!key:datatype');
        expect(Patterns.item_serialize({key: 'key', datatype: 'datatype', defaults: 'default', required: true}))
            .toEqual('!key:datatype=default');
        });
    });

    describe('path patterns', ()=>{
        test('path parameterizing', ()=>{
            expect(Patterns.path_parse('ex'))
                .to.contain({type: 'text', text: 'ex' });
            expect(Patterns.path_parse('<ex>'))
                .to.contain({type: 'parameter', datatype: 'ex', defaults: null, optional: false });
            expect(Patterns.path_parse('<ex?>'))
                .to.contain({type: 'parameter', datatype: 'ex', defaults: null, optional: true });
            expect(Patterns.path_parse('<ex=defaults>'))
                .to.contain({type: 'parameter', datatype: 'ex', defaults: 'defaults', optional: false });
                expect(Patterns.path_parse('<ex?=defaults>'))
                .to.contain({type: 'parameter', datatype: 'ex', defaults: 'defaults', optional: true });
        });

        test('path_serialize', ()=>{
            expect(Patterns.path_serialize({type: 'text', text: 'ex'}))
                .toEqual('ex');
            expect(Patterns.path_serialize({type: 'parameter', datatype: 'ex', defaults: null, optional: false }))
                .toEqual('<ex>');
            expect(Patterns.path_serialize({type: 'parameter', datatype: 'ex', defaults: null, optional: true }))
                .toEqual('<ex?>');
            expect(Patterns.path_serialize({type: 'parameter', datatype: 'ex', defaults: 'defaults', optional: false }))
                .toEqual('<ex=defaults>');
            expect(Patterns.path_serialize({type: 'parameter', datatype: 'ex', defaults: 'defaults', optional: true }))
                .toEqual('<ex?=defaults>');
        });
    });

    describe('singleliner patterns', ()=>{
        test('liner parse simple', ()=>{
            expect(Patterns.liner_parse('(key) title'), '#1')
                .to.contain({keytype: 'key', title: 'title'});
            expect(Patterns.liner_parse('(key) title <> description'), '#2')
                .to.contain({keytype: 'key', title: 'title', description: 'description'});
            expect(Patterns.liner_parse('(key) title <url> description'), '#3')
                .to.contain({keytype: 'key', title: 'title', description: 'description'});
        });
    });

});