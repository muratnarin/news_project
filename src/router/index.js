import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/newspaper/:id',
    name: 'Newspaper',
    component: () => import('@/views/Newspaper')
  },
  {
    path: '*',
    name: 'redirect',
    component: () => import('@/views/Error404.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
