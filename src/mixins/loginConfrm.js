export default {
  // 实例的配置项可以直接写入
  // 如果有和组件同名的data 或者methods，优先使用组件的
  // 如果这里有生命周期函数，则mixins中的生命周期和
  // 组件中的生命周期函数都会执行
  methods: {
    loginConfirm () {
    // 判断token是否存在
      if (!this.$store.getters.token) {
        this.$dialog.confirm({
          title: '温馨提示',
          message: '您还未登录，请先登录',
          confirmButtonText: '去登陆',
          cancelButtonText: '再逛逛'
        }).then(() => {
        // 如果希望跳转到登录页面后能回来
        // 要加上当前的页面地址
        // this.$route.fullPath
          this.$router.replace({
            path: '/login',
            query: {
              backUrl: this.$route.fullPath
            }
          })
        })
        return true // 显示弹出确认框，表示没有登录
      }
      return false // 表示已经登录
    }
  }
}
