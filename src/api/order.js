import request from '@/utils/request'

export const checkOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode, // cart buyNow
      shopId: 0,
      delivery: 10, // 10 快递配送 20 门店自提
      couponId: 0, // 优惠券ID 传0 不使用优惠券
      isUsePoints: 0, // 积分 传0 不使用积分
      ...obj // 将传递过来的参数对象 动态展开
    }
  })
}

// 提交订单
// mode: cart obj {cartIds,remark}
// mode: buyNow obj {goodsId,goodsSkuId,goodsNum,remark}
export const submitOrder = (mode, obj) => {
  return request.post('/checkout/submit', {
    mode,
    delivery: 10,
    conponId: 0,
    isUsePoints: 0,
    payType: 10,
    ...obj
  })
}

// 订单列表
export const getMyOrderList = (dataType, page) => {
  return request.get('/order/list', {
    params: {
      dataType,
      page
    }
  })
}
