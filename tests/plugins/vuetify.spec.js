import vuetify from '@/plugins/vuetify'
import { describe, assert, it } from "vitest";

describe('test vuetify', ()=>{
    it('loads vuetify plugin', ()=>{
        assert(typeof vuetify === 'object');
    })
});