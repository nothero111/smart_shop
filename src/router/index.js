import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入一级路由
import Login from '@/views/login/index.vue'
import layout from '@/views/layout/index.vue'
import myorder from '@/views/myorder/index.vue'
import payindex from '@/views/pay/index.vue'
import prodetail from '@/views/prodetail/index.vue'
import searchIndex from '@/views/search/index.vue'
import SearchList from '@/views/search/list.vue'
// 导入二级路由
import home from '@/views/layout/home.vue'
import category from '@/views/layout/category.vue'
import cart from '@/views/layout/cart.vue'
import user from '@/views/layout/user.vue'
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
    { path: '/prodetail', component: prodetail },
    { path: '/search/:id', component: searchIndex },
    { path: '/searchlist', component: SearchList }
  ]
})

export default router
