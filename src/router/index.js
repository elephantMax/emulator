import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/:color',
    name: 'Main',
    component: () => import('@/views/Main')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Main')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
