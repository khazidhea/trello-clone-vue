import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    name: 'home',
    path: '/',
    component: () => import('@/components/Login'),
  },
  {
    name: 'tasks',
    path: '/tasks/',
    component: () => import('@/components/TaskList'),
  },
  {
    name: 'task',
    path: '/tasks/:id/',
    component: () => import('@/components/Task'),
    props: (route) => ({ id: Number.parseInt(route.params.id) })
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
