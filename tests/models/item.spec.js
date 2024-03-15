import { testit } from '%/with';
import Item from '@/models/item';

describe('item properties', ()=>{
    const props = ['id', 'name', 'description', 'price', 'quantity', 'icon'];
    const samples = Item.samples();

    it('tests item props', ()=>{
        const test_value = 'test';
        props.forEach((prop)=>{
            let it = new Item({[prop]: test_value});
            assert(it[prop] === test_value, `prop ${prop} should set ${test_value} but ${it[prop]}`);
        });
    });

    testit(()=>samples.length, 'samples length', (expect)=>(0<expect));
})