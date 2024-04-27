import vuetify from './vuetify.js';
import vuerouter from './vuerouter.js';
import pinia from './pinia.js';

export default {
    libs: {
        pinia,
        vuetify,
        vuerouter,
    },
    register(app) {
        return app
            .use(vuetify)
            .use(pinia)
            .use(vuerouter)
    }
}