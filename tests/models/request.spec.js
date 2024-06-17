import Request from '@/models/request'
import { describe, test, expect } from 'vitest';

describe('request model specifications', ()=>{
    describe('property: method setup', ()=>{
        test('setting method', ()=>{
            Request.methods.forEach((method)=>{
                const request = new Request({method});
                expect(request.method).toBe(method);
            });
        });
        test('method case insensitive', ()=>{
            Request.methods.forEach((method)=>{
                const request = new Request({method: method.toLowerCase()});
                expect(request.method).toBe(method);
            });
        });
    });

    describe('property: path setup', ()=>{
        // simple path setting
        test('simple path', ()=>{
            const reqs = [
                // simple boundary condition
                {path: '/', expected: '/'},
                {path: '//', expected: '//'},
                // simple text reconstruct
                {path: '/api', expected: '/api'},
                // with parameter
                {path: '/api/<id>', expected: '/api/<id>'},
                // with extender
                {path: '/api/...', expected: '/api/...'},
                {path: '/...', expected: '/...'},
            ];
            reqs.forEach(({path, expected})=>{
                const request = new Request({path});
                expect(request.pathname).toBe(expected);
            });
        });
        // path parameter parsing
        test('path parameter matching', ()=>{
            const req = new Request({path: '/<A>/<B?>/<C=1>/...'});
            // first fragment: required A type non-default
            expect(req.path_fragment(1).type).toBe(Request.path_type.parameter);
            expect(req.path_fragment(1).datatype).toBe('A');
            expect(req.path_fragment(1).optional).toBe(false);
            expect(req.path_fragment(1).defaults == null).toBe(true);
            // second fragment: optional B type non-default
            expect(req.path_fragment(2).type).toBe(Request.path_type.parameter);
            expect(req.path_fragment(2).datatype).toBe('B');
            expect(req.path_fragment(2).optional).toBe(true);
            expect(req.path_fragment(2).defaults == null).toBe(true);
            // third fragment: required C type with default
            expect(req.path_fragment(3).type).toBe(Request.path_type.parameter);
            expect(req.path_fragment(3).datatype).toBe('C');
            expect(req.path_fragment(3).optional).toBe(false);
            expect(req.path_fragment(3).defaults).toBe('1');
            // fourth fragment: extender
            expect(req.path_fragment(4).type).toBe(Request.path_type.extender);
        });
        // path parsing
        test('path parsing', ()=>{
            const req = new Request({path: '/api/<name>/...'});
            const tests = [
                {type: Request.path_type.text, text: 'api'},
                {type: Request.path_type.parameter, datatype: 'name', optional: false},
                {type: Request.path_type.extender},
            ];
            tests.forEach((expected, index)=>{
                // shifting index by 1 to cover prepanding "/"
                const frag = req.path_fragment(index+1);
                expect(frag).to.contain(expected);
            });
        });

        // skipping path matching for now. 20240515
        // test('path matching', ()=>{ 
        //     const req = new Request({path: '/api/<name>/...'});
        //     const expectations = [
        //         {path: '/', expected: false},
        //         {path: '/api', expected: false},
        //         {path: '/api/', expected: false},
        //         {path: '/api/yg', expected: true},
        //         {path: '/api/yg/', expected: true},
        //         {path: '/api/yg/1', expected: true},
        //         {path: '/api/kb/sample', expected: true},
        //         {path: '/api/any/sample/1/next', expected: true},
        //     ]
        //     expectations.forEach(({path, expected})=>{
        //         expect(req.path_match(path), `@[${path}]`).toBe(expected);
        //     });
        // });
    });

    describe('property: query setup', ()=>{
        test('query setup', ()=>{
            const req = new Request({queries: {}});
            expect(req.query_texts.join('\n')).toBe('');
            req.queries = {'!a':'A', b:'B', c:'C=1'};
            expect(req.query_texts.join('\n')).toBe('!a:A\nb:B\nc:C=1');

            expect(req.query_fragments.a).to.contain({datatype: 'A', required: true});
            expect(req.query_fragments.b).to.contain({datatype: 'B', required: false});
            expect(req.query_fragments.c).to.contain({datatype: 'C', defaults: '1'});
        });
    });
});