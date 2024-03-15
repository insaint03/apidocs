import vuetify from './vuetify.js';
import vuerouter from './vuerouter.js';
import pinia from './pinia.js';

export default {
    libs: {
        vuetify,
        vuerouter,
        pinia,
    },
    register(app) {
        return app
            .use(pinia)
            .use(vuetify)
            .use(vuerouter)
    }
}