import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    name: 'home',
    path: '/',
    component: () => import('@/components/TaskList'),
  },
  {
    name: 'login',
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

router.beforeEach((to, from, next) => {
  console.log(store)
  if (to.name !== 'login' && !store.state.auth.isAuthenticated) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
