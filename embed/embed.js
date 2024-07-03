import { createApp } from "vue";
import Embed from "@/Embed.vue";
import plugins from "@/plugins";

const selector = '#apidoc';
const anchor = document.querySelector(selector);
const props = Object.fromEntries([
    'location',
    'theme',
    'locale',
].map((key)=>[key, anchor.getAttribute(key) || null]));

const app = createApp(Embed, props);
plugins.register_embed(app)
    .mount('#apidoc');

