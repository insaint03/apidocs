import { createRouter, createWebHistory, /*, createWebHashHistory */ } from 'vue-router'
import viewerScreen from '@/viewer/index.vue'
import editorScreen from '@/editor/index.vue'
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
];
// const routes = Object.entries({
//   view: viewerScreen,
//   edit: editorScreen,
//   // old: legacyEditor,
//   // 'explorer': '@/views/explorerView.vue',
// }).map(([name, component])=>({
//   name,
//   path: `/${name}`,
//   component: component,
// }));
routes.push({
  name: 'index',
  path: '/',
  component: editorScreen,
})

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
export default router
