import Response from '@/models/response'
import { describe, expect, test } from "vitest";

describe('response model specifications', ()=>{
    test('property: status setup', ()=>{
        const resp = new Response({status: 200});
        expect(resp.status_code).toBe(200);
        expect(resp.status_title).toBe('OK');

        resp.status = 'Internal Server Error';
        expect(resp.status_code).toBe(500);
        expect(resp.status_title).toBe('Internal Server Error');
    });
    test('property: mimetype setup', ()=>{
        const resp = new Response({mimetype: 'application/json'});
        expect(resp.mimetype).toBe('application/json');

        resp.mimetype = 'text/html';
        expect(resp.mimetype).toBe('text/html');
    });
});