import models from '@/models';
import { describe, test, expect } from 'vitest';
import fs from 'fs';
import Template from '@/models/template';

describe('models', ()=>{
    const internal_url = '../data/simple.native.yaml';
    const external_url = 'https://raw.githubusercontent.com/insaint03/apidocs/main/data/simple.native.yaml';
    const write_location = '../data/test.native.yaml';
    


    test('loading', async ()=>{
        const loaded = await models.loads(internal_url);

        expect(loaded.project.name).not.toBe(null);
        expect(loaded.datatypes).toBeInstanceOf(Object);
        expect(Object.entries(loaded.datatypes).length).toBeGreaterThan(0);
        expect(loaded.templates).toBeInstanceOf(Object);
        expect(Object.entries(loaded.templates).length).toBeGreaterThan(0);
        expect(loaded.entities.length).toBeGreaterThan(0);
    });


    test('loading external yaml', async ()=>{
        const loaded = await models.loads(external_url);

        expect(loaded.project.name).not.toBe(null);
        expect(loaded.datatypes).toBeInstanceOf(Object);
        expect(Object.entries(loaded.datatypes).length).toBeGreaterThan(0);
        expect(loaded.templates).toBeInstanceOf(Object);
        expect(Object.entries(loaded.templates).length).toBeGreaterThan(0);
        expect(loaded.entities.length).toBeGreaterThan(0);
    
    })

    test('writing text yaml', async()=>{
        const loaded = await models.loads(internal_url);
        if(fs.existsSync(write_location)) {
            fs.unlinkSync(write_location);
        }

        const str_yaml = await models.serialize_yaml(loaded);
        const obj_yaml = await models.deserialize_yaml(str_yaml);

        Object.entries(obj_yaml)
            .filter(([k,])=>!['timestamp','location'].includes(k))
            .forEach(([k,v])=>{
                expect(loaded[k]!=null).not.toBeNull();
                expect(typeof(v), `type ${k}`).toBe(typeof(loaded[k]));
            });
        
    });
    
    test('writing text json', async()=>{
        const loaded = await models.loads(internal_url);
        if(fs.existsSync(write_location)) {
            fs.unlinkSync(write_location);
        }
        const str_json = await models.serialize_json(loaded);
        const obj_json = await models.deserialize_json(str_json);

        Object.entries(obj_json)
            .filter(([k,])=>!['timestamp','location'].includes(k))
            .forEach(([k,v])=>{
                expect(loaded[k]!=null);
                expect(typeof(v), `type ${k}`).toBe(typeof(loaded[k]));
            });
    });

    test('serialization yaml', async ()=>{
        const loaded = await models.loads(internal_url);

        const yaml = await models.serialize_yaml(loaded);
        const reloaded = await models.deserialize_yaml(yaml);
        const reyaml = await models.serialize_yaml(reloaded);

        expect(yaml).toEqual(reyaml);
    });

    test('serialization json', async ()=>{ 
        const loaded = await models.loads(internal_url);

        const json = await models.serialize_json(loaded);
        const reloaded = await models.deserialize_json(json);
        const rejson = await models.serialize_json(reloaded);

        expect(json).toEqual(rejson);
    });

    test('simplest building a single entity', ()=>{
        const get_tmpl = Template.setup({name: 'req_get'});
        get_tmpl.description = 'Get Request';
        const json_tmpl = new Template({name: 'resp_json', response: {status: 200, mimetype: 'application/json'}}); 
        const entity = models.build(get_tmpl, json_tmpl);

        // expect(entity).toBeInstanceOf(Entity);
        expect(entity.templates.length).toBe(2);
        expect(entity.request.method).toBe('GET');
        expect(entity.response.mimetype).toBe('application/json');
    });
})