import { changeCount, delSelect, getCartList } from '@/api/cart'
import { Toast } from 'vant'

export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    // 提供一个设置cartList的mutation
    setCartList (state, newList) {
      state.cartList = newList
    },
    toggleCheck (state, goodsId) {
      // 找到对应的商品
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.isChecked = !goods.isChecked
    },
    toggleAllCheck (state, flag) {
      state.cartList.forEach(item => {
        item.isChecked = flag
      })
    },
    changeCount (state, { goodsNum, goodsId }) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.goods_num = goodsNum
    }
  },
  actions: {
    async getCartAction (context) {
      const { data } = await getCartList()
      // 后台返回的数据不返回选中状态，需要手动添加
      data.list.forEach(item => {
        item.isChecked = true
      })
      context.commit('setCartList', data.list)
    },
    async changeCountAction (context, obj) {
      const { goodsNum, goodsId, goodsSkuId } = obj
      // 先本地修改
      context.commit('changeCount', { goodsNum, goodsId })
      // 再同步到后台
      await changeCount(goodsId, goodsNum, goodsSkuId)
    },
    // 删除购物车数据
    async delSelect (context) {
      const selCartList = context.getters.selCartList
      const cartsIds = selCartList.map(item => item.id)
      await delSelect(cartsIds)
      Toast('删除成功')
      await context.dispatch('getCartAction')
    }
  },
  getters: {
    // 购物车商品累加总数
    cartTotal (state) {
      return state.cartList.reduce((sum, item) =>
        sum + item.goods_num
      , 0)
    },
    // 选中商品项
    selCartList (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    // 选中商品数量
    selCount (state, getters) {
      return getters.selCartList.reduce((sum, item) =>
        sum + item.goods_num
      , 0)
    },
    // 选中商品总价
    selPrice (state, getters) {
      return getters.selCartList.reduce((sum, item) =>
        sum + item.goods_num * item.goods.goods_price_min, 0).toFixed(2)
    },
    // 是否全选
    isAllChecked (state) {
      return state.cartList.every(item => item.isChecked)
    }
  }
}
