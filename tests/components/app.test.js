import Test from '%/with'
import App from '@/App.vue'

describe('app component test', async ()=>{
    const app = new Test(App);
    test('skip', ()=>{
        assert(true, 'skip');
    })
})