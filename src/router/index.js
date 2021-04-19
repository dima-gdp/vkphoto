import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      auth: true
    },
    component: () => import('@/views/Home.vue'),
    children: [
      {
        name: 'SinglePhoto',
        path: 'photo',
        meta: {
          auth: true
        },
        component: () => import('@/views/SinglePost.vue')
      }
    ]
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/views/Auth.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  new Promise(resolve => {
    VK.Auth.getLoginStatus((r) => {
      resolve(r.status)
    })
  })
    .then((loginStatus) => {
      const requireAuth = to.meta.auth
      if (requireAuth && loginStatus !== 'connected') {
        next({ name: 'Auth' })
      } else {
        next()
      }
    })
    .catch(() => next({ name: 'Auth' }))
})

export default router
