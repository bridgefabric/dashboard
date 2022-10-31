import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/nodes'
    // component: () => import('@/views/HomeView')
  },
  {
    path: '/actors',
    name: 'actors',
    component: () => import('@/views/relay')
  },
  {
    path: '/nodes',
    name: 'nodes',
    component: () => import('@/views/nodes')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
