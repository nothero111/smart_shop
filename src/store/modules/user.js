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
  actions: {},
  getters: {}

}
