import { defineStore } from "pinia"
import { ref } from "vue"
import Item from '@/models/item';

export const useStockStore = defineStore('stock', ()=>({
    /** states **/
    items: ref(Item.samples(), []),

    /** getters */
    // total_quantity: computed((state)=>state.items.reduce((acc, item)=>acc+item.quantity, 0)),

    /** actions **/
    // add_item: (item)=>{
    //     state.items.push(item);
    // },
}));