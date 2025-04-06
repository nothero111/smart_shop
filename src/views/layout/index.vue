<script>
export default {
  name: 'LayoutIndex'
}
</script>

<template>
<div>
  <router-view></router-view>
<!--  二级路由出口-->
  <van-tabbar active-color="#ee0a24" inactive-color="#000" route>
    <van-tabbar-item icon="wap-home-o" to ='/home'>首页</van-tabbar-item>
    <van-tabbar-item icon="apps-o" to="/category">分类页</van-tabbar-item>
    <van-tabbar-item icon="shopping-cart-o" to="/cart">购物车</van-tabbar-item>
    <van-tabbar-item icon="user-o" to="/user">我的</van-tabbar-item>
  </van-tabbar>
</div>
</template>

<style scoped lang="less">

</style>
