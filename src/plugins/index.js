import vuetify from './vuetify.js';
import vuerouter from './vuerouter.js';
import pinia from './pinia.js';
import i18n from './i18n.js';
import theme from './theme.js';

export default {
    i18n,
    theme,
    pinia,
    vuetify,
    vuerouter,
    // libs: {
    // },
    register(app) {
        return app
            .use(vuetify)
            .use(pinia)
            .use(vuerouter)
            .use(theme)
            .use(i18n)
    },
    register_embed(app) {
        return app
            .use(vuetify)
            .use(pinia)
            .use(theme)
            .use(i18n);
    }
}