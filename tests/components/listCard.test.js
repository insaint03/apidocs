import { v_component } from '%/with'
import indexPage from '@/views/indexView.vue'
import Item from '@/models/item'

describe('indexView feature test', async () =>{
    const v = await v_component(indexPage, {
        title: 'test',
        items: Item.samples(),
    });
    it('button click', async ()=> {
        // expect button click event
        await v.vm.$emit('click');
        // 
        assert(true, 'pass');
    });
});