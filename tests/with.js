import { mount } from '@vue/test-utils'
import plugins from '@/plugins'
import vuetify from '@/plugins/vuetify'
// import vuerouter from '@/plugins/vuerouter'

global.ResizeObserver = require('resize-observer-polyfill');
const plugins_all = Object.values(plugins.libs);
const plugins_without_vuetify = plugins_all.filter((pl)=>pl!==vuetify);

module.exports = {
    async raw_component(component, props={}) {
        return mount(component, {props, global: {plugins: plugins_without_vuetify}});
    },
    async v_component(component, props={}) {
        return mount(component, {
            props,
            global: {plugins: plugins_all}
        });
    },
    testit(fn, title, expect) {
        return it(title, async ()=>{
            const actual = await fn();
            let assertion = null;
            if(typeof expect === 'function') {
                assertion = expect(actual);
            } else if(expect != null) {
                assertion = (expect === actual);
            } else {
                assertion = actual;
            }
            assert(assertion, `expects ${expect} but ${actual}`);
        });
    }
}