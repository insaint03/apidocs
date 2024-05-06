import Test from '%/with'
import editorView from '@/views/editorView.vue'

const tabs = [
    // service info tab
    'info',
    // parameters tab
    'datatypes',
    // entities tab
    'entities',
    // templates tab
    'templates',
    // viewer tab
    'viewer'
];
describe('editor view', async ()=>{
    const editor = new Test(editorView);
    test('editor view contents', ()=>{
        // appbar & menu
        expect(editor.find('v-app-bar')).toBeTruthy();

        // bottom navigation
        expect(editor.find('v-bottom-navigation')).toBeTruthy();

        // main
        expect(editor.find('v-main')).toBeTruthy();
        
        const windows = editor.find('v-window');
        expect(windows).toBeTruthy();
        
        tabs.forEach((tab)=>{
            expect(editor.find(`v-window v-window-item[value="${tab}"]`)).toBeTruthy();
        });
    });
});