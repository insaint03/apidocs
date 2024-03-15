import vuetify from '@/plugins/vuetify'

describe('test vuetify', ()=>{
    it('loads vuetify plugin', ()=>{
        assert(typeof vuetify === 'object');
    })
});