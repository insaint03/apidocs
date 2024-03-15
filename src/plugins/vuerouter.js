import { createRouter, createWebHashHistory } from 'vue-router'
import views from '@/views'

const naming = (path) => path
    .replace(/^\//, '')
    .replace(/[^\w\.-_]+/g, '-')
    .toLowerCase();
  
const routes = Object.entries(views).map(([path, view])=>({
  path,
  name: naming(path),
  component: ()=>import(`@/views/${view}View.vue`),
}));

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
