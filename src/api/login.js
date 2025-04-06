// 存放所有与登录相关的接口请求
// 1.获取图形验证码
import request from '@/utils/request'

export const getPicCode = () => {
  return request.get('/captcha/image')
}
// 获取短信验证码的请求接口
export const getMsgCode = (captchaCode, captchaKey, mobile) => {
  return request.get('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode,
      captchaKey,
      mobile
    }
  })
}

// 3.登录接口
export const codeLogin = (mobile, smsCode) => {
  return request.post('/passport/login', {
    form: {
      isParty: false,
      partyData: {},
      mobile,
      smsCode
    }
  })
}
