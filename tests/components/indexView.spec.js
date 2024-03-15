import { testit, raw_component } from '%/with'
import indexPage from '@/views/indexView.vue'

describe('indexView component', async ()=>{
    const raw = await raw_component(indexPage);
    
    // contains v-btn
    testit(()=>raw.find('v-container').exists(), 'v-container found');
    // test its text
    testit(()=>raw.find('v-card').exists(), 'v-card found');
});
