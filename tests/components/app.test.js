import { v_component, raw_component } from '%/with'
import App from '@/App.vue'

describe('app component', ()=>{
    it('test app', async ()=>{
        // raw template may contain v-app
        const raw = await raw_component(App);
        assert(raw.find('v-app').exists());

        // however, vuetify-parsed component 
        // would transfer v-app to div
        const v = await v_component(App);
        assert(v.find('h1').exists());
    })
})