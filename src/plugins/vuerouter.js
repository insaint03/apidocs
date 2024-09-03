import { createRouter, createWebHistory, /*, createWebHashHistory */ } from 'vue-router'
import viewerScreen from '@/viewer/index.vue'
import editorScreen from '@/editor/index.vue'
import guideView from '@/views/guide.vue'
import specView from '@/views/spec.vue'
// import legacyEditor from '@/views/editorView.legacy.vue'
import gtm from '@/gtm.js'
// import explorerScreen from '@/views/explorerView.vue'

const load_props = ({query})=>({
  location: query.d,
});

const routes = [
  {name: 'index', path: '/', component: editorScreen, props: load_props},
  {name: 'view', path: '/view', component: viewerScreen, props: load_props},
  {name: 'edit', path: '/edit', component: editorScreen, props: load_props},
  { name: 'guide', path: '/guide', component: guideView, props: load_props },
  { name: 'spec', path: '/spec', component: specView, props: load_props }
];

const router = createRouter({
  // history: createWebHashHistory(),
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next)=>{
  // let path = to.path;
  if(to.query.view) {
    return next({path: '/view', query: {d: to.query.view}});
  } else if(to.query.edit) {
    return next({path: '/edit', query: {d: to.query.edit}});
  } else {
    return next();
  }
});
router.beforeResolve = async (to)=>{
  gtm.push('pageview', {page: to.path});
};
export default router;
