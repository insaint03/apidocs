import { testit, raw_component } from "%/with.js";
import listCard from "@/components/listCard.vue";
import Item from '@/models/item';

describe("listCard component", async () => {
    const title = "tests";
    const items = Item.samples();
    const raw = await raw_component(listCard, {
        title: title,
        items: items,
    });
    // v-card exists
    testit(()=>raw.find('v-card').exists(), 'v-card found');
    // v-toolbar-title with title prop
    testit(()=>raw.find('v-toolbar-title').exists(), 'v-toolbar-title found');
    testit(()=>raw.find('v-toolbar-title').text(), 'v-toolbar-title text', title);
    // v-list with items prop
    testit(()=>raw.find('v-list').exists(), 'v-list found');
    
});
