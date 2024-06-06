import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import viewerScreen from '@/viewer/index.vue'
import editorScreen from '@/views/editorView.vue'
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

const router = createRouter({
  // history: createWebHashHistory(),
  history: createWebHistory(),
  routes,
})

export default router
