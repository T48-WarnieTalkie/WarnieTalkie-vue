export default [
  {
    path: "/user/info",
    name: "userInfo",
    component: () => import('../views/userInfo.vue'),
    meta: {permissions: 'logged'}
  }
]