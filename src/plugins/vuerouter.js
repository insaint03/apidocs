import { createRouter, createWebHistory, /*, createWebHashHistory */ } from 'vue-router'
import viewerScreen from '@/viewer/index.vue'
import editorScreen from '@/views/editorView.vue'
import gtm from '@/gtm.js'
// import explorerScreen from '@/views/explorerView.vue'

const routes = Object.entries({
  view: viewerScreen,
  edit: editorScreen,
  // 'explorer': '@/views/explorerView.vue',
}).map(([name, component])=>({
  name,
  path: `/${name}`,
  component: component,
}));
routes.push({
  name: 'index',
  path: '/',
  component: viewerScreen,
})

const router = createRouter({
  // history: createWebHashHistory(),
  history: createWebHistory(),
  routes,
});
router.beforeResolve = async (to)=>{
  // console.log('router.afterEach', {to, from})
  gtm.push('pageview', {page: to.path});
};
export default router
