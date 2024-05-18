import models from '@/models';
import { describe, test, expect } from 'vitest';

describe('models', ()=>{
    test('loading', async ()=>{
        const loaded = await models.loads('../data/simple.native.yaml');


        expect(loaded.project.name).not.toBe(null);
        expect(loaded.datatypes).toBeInstanceOf(Object);
        expect(Object.entries(loaded.datatypes).length).toBeGreaterThan(0);
        expect(loaded.templates).toBeInstanceOf(Object);
        expect(Object.entries(loaded.templates).length).toBeGreaterThan(0);
        expect(loaded.entities.length).toBeGreaterThan(0);
    })

    test('serialization yaml', async ()=>{
        const loaded = await models.loads('../data/simple.native.yaml');

        const yaml = await models.serialize_yaml(loaded);
        const reloaded = await models.deserialize_yaml(yaml);
        const reyaml = await models.serialize_yaml(reloaded);

        expect(yaml).toEqual(reyaml);
    })

    test('serialization json', async ()=>{ 
        const loaded = await models.loads('../data/simple.native.yaml');

        const json = await models.serialize_json(loaded);
        const reloaded = await models.deserialize_json(json);
        const rejson = await models.serialize_json(reloaded);

        expect(json).toEqual(rejson);
    })
})