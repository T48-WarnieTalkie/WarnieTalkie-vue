export default [
  {
    path: '/danger/sent',
    name: 'sentDangers',
    component: () => import('../views/sentDangers.vue'),
    meta: {permissions: 'logged'}
  },
  {
    path: '/danger/add',
    name: 'addDanger',
    component: () => import('../views/addDanger.vue'),
    meta: {permissions: 'logged'}
  },
  {
    path: '/danger/handle',
    name: 'handleDangers',
    component: () => import('../views/handleDanger.vue'),
    meta: {permissions: 'moderator'}
  },
  {
    path: '/danger/:dangerId',
    name: 'visualizeDanger',
    component: () => import('../views/visualizeDanger.vue')
  }
]