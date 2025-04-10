import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
// 导入一级路由

import layout from '@/views/layout/index.vue'
// 导入二级路由
import home from '@/views/layout/home.vue'
import category from '@/views/layout/category.vue'
import cart from '@/views/layout/cart.vue'
import user from '@/views/layout/user.vue'
const Login = () => import('@/views/login/index.vue')
const myorder = () => import('@/views/myorder/index.vue')
const payindex = () => import('@/views/pay/index.vue')
const prodetail = () => import('@/views/prodetail/index.vue')
const searchIndex = () => import('@/views/search/index.vue')
const SearchList = () => import('@/views/search/list.vue')
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: layout,
      redirect: '/home',
      children: [
        { path: '/home', component: home },
        { path: '/category', component: category },
        { path: '/cart', component: cart },
        { path: '/user', component: user }
      ]
    },
    { path: '/myorder', component: myorder },
    { path: '/pay', component: payindex },
    // 动态路由，确定是哪个商品
    { path: '/prodetail/:id', component: prodetail },
    { path: '/search', component: searchIndex },
    { path: '/searchlist', component: SearchList }
  ]
})

// 全局前置导航守卫
// to：到哪去，到哪去的完整路由信息对象（路径，参数）
// from：从哪来，从哪来的完整路由信息对象（路径，参数）
// next：函数，控制路由是否放行，next()放行，next('/login')跳转到登录页
const authUrls = ['/pay', '/myorder']
router.beforeEach((to, from, next) => {
  // 看to.path 是否在authUrls数组中出现过
  if (!authUrls.includes(to.path)) {
    next()
    return
  }
  const token = store.getters.token
  if (token) {
    next()
  } else {
    next('/login')
  }
})
export default router
