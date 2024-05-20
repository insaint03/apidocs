import { mount } from '@vue/test-utils'
import plugins from '@/plugins'
import vuetify from '@/plugins/vuetify'
// import vuerouter from '@/plugins/vuerouter'

global.ResizeObserver = require('resize-observer-polyfill');
const plugins_all = Object.values(plugins.libs);
const plugins_without_vuetify = plugins_all.filter((pl)=>pl!==vuetify);

export default class Test {
    constructor(component, props={}, with_vuetify=true) {
        this._component = component;
        this._props = props;
        this._global = { plugins: with_vuetify ? plugins_all : plugins_without_vuetify };
        this._testee = null;
    }

    async mount(props={}) {
        if(!this._testee) {
            this._testee = await mount(this._component, {
                props: (this._props || props),
                global: this._global,
            });
        }
        return this._testee;
    }

    get props() { return this._props;}
    get component() { return this.mount(); }
    get plugins() { return this._global; }

    
    async find(selector) {
        const anchor = await this.component;
        const found = anchor.findComponent(selector);
        assert(expect(found).toBe().notNull(), `[${selector}] not found`);
        return found;
    }
    
    async findall(selector) {
        const anchor = await this.component;
        const found = anchor.findAllComponents(selector);
        assert(expect(found).toBe(Array).notNull(), `[${selector}] not found`);
        return found;
    }
    
    async test_find(selector, fn) {
        return fn(await this.find(selector));
    }

    async test_all(selector, fn) {
        return await this.findall(selector).array.forEach(fn);
    }
}