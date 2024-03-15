import Item from '@/models/item';

describe('item running test', ()=>{
    it('item construction', ()=>{
        const props = ['id', 'name', 'description', 'price', 'quantity', 'icon'];
        const it = Object.fromEntries(props.map((p)=>[p,p]));
        const item = new Item(it);
        props.forEach((prop)=>{
            assert(item[prop] === it[prop], `item.${prop} should be ${it[prop]}`);
        });
    })
})