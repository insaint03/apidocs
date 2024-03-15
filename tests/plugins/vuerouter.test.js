import views from '@/views'
import router from '@/plugins/vuerouter'

describe('test routings', ()=>{
    it('routing table', ()=>{
        // object test
        assert(typeof views === 'object');
        // test for each
        Object.entries(views).forEach(([path, view])=>{
            // key, value both string
            assert(typeof path === 'string');
            assert(typeof view === 'string');
            // starting with '/'
            assert(/^\/.*/.test(path) == true);
            // loading
        });
    })
});

describe('test router', ()=>{
    it('should contain router', ()=>{
        Object.keys(views).forEach((path)=>{
            router.hasRoute(path, `no route for ${path}`);
        })
    })
})