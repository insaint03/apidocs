import { createVuetify } from 'vuetify';
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css';
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import markDown from '@/components/markdown.vue'
// import expandIcon from '@/components/expandIcon.vue'

export default createVuetify({
    components: {
        markDown,
        // expandIcon,
        ...components
    },
    directives,
})