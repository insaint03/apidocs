import Test from '%/with'
import App from '@/App.vue'

describe('app contains v-app', async ()=>{
    const tester = new Test(App);
    test('app component', async ()=> {
        tester.test_find('v-app', (app)=>{
            assert(app.findComponent('router-view').toBeTruthy(), 'router-view existance');
        });
    });
})