import { createRouter, createWebHistory } from 'vue-router'
import dangerRoutes from './danger'
import userRoutes from './user'
import { isLogged, loggedUser } from '@/states/loggedUser'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/registration.vue')
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('../views/logout.vue'),
      meta: {permissions: 'logged'}
    },
    ...dangerRoutes,
    ...userRoutes
  ],
})

router.beforeEach((to, from) => {
  if(to.meta.permissions == 'logged') {
    if(!isLogged()) {
      return {name: 'home'}
    }
  }
  if(to.meta.permissions == 'moderator') {
    if(!loggedUser.isModerator) {
      return {name: 'home'}
    }
  }
})

export default router
