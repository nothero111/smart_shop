import { getInfo, setInfo } from '@/utils/Storage'

export default {
  namespaced: true,
  state () {
    return {
      // 个人权证相关
      userInfo: getInfo()
    }
  },
  mutations: {
    // 把从login拿到的用户数据本地化存储
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
      setInfo(userInfo)
    }
  },
  actions: {
    logout (context) {
      // 个人信息重置
      context.commit('setUserInfo', {})
      // 购物车重置
      context.commit('cart/setCartList', [], { root: true })
    }
  },
  getters: {}

}
