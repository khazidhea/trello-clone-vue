import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/components/Login'),
  },
  {
    path: '/tasks/:id/',
    component: () => import('@/components/Task'),
    props: (route) => ({ id: Number.parseInt(route.params.id) })
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
