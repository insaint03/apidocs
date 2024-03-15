import { createApp } from 'vue'

import App from '@/App.vue'
import plugins from '@/plugins'

// create application instance
const app = createApp(App)
// register plugins
plugins.register(app);

// start & mount
app.mount('#app')
