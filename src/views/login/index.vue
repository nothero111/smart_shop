
<template>
<!--  顶部导航栏-->
<div>
  <van-nav-bar
    title="会员登陆"
    left-arrow
    @click-left="$router.back()"
  />
<!--  下面的注册页面-->
  <section class="container">
<!--    顶部文字部分-->
    <div class="title">
      <h3>手机号登录</h3>
      <p>未注册的手机号登录后将自动注册</p>
    </div>
<!--   填写信息模块-->
    <div class="form">
      <div class="form-item">
        <input v-model="mobile" type="text" class="inp" maxlength="11" placeholder="请输入手机号">
      </div>
      <div class="form-item">
        <input v-model="picCode" type="text" class="inp" maxlength="5" placeholder="请输入图形验证码">
        <img v-if="picUrl" :src="picUrl" @click="getPicCode" alt="">
      </div>
      <div class="form-item">
        <input v-model="smsCode" type="text" class="inp" placeholder="请输入短信验证码">
        <button
          :style="{ color: second === totalSecond ? '#cea26a' : 'grey'}"
          @click="getCode">
           {{second === totalSecond ? '获取验证码' : `${second}
           秒后重新发送`}}
        </button>
      </div>
    </div>
<!--    提交登录信息按钮-->
    <button @click="login" class="login-btn">登录</button>
  </section>
</div>
</template>
<script>
import { codeLogin, getMsgCode, getPicCode } from '@/api/login'
import { Toast } from 'vant'
export default {
  name: 'LoginIndex',
  data () {
    return {
      picCode: '', // 用户输入的图形验证码
      picKey: '', // 图形验证码的key
      picUrl: '', // 存储请求渲染的图片地址
      totalSecond: 60, // 总秒数
      second: 60, // 当前秒数
      timer: null, // 定时器
      mobile: '', // 用户输入的手机号
      smsCode: '' // 用户输入的短信验证码
    }
  },
  methods: {
    async getPicCode () { // 封装一个获取图形验证码的函数
      const { data: { base64, key } } = await getPicCode()
      this.picUrl = base64 // 存储地址
      this.picKey = key // 存储唯一标示
      Toast('获取图形验证码成功')
    },
    async getCode () {
      if (!this.validFn()) {
      //  如果没通过校验直接结束
        return false
      }
      if (this.second !== this.totalSecond) {
        return
      }
      // 发送请求获取验证码
      // 请求成功后，倒计时开始
      await getMsgCode(this.picCode, this.picKey, this.mobile)
      this.$toast('获取短信验证码成功')
      this.second = this.totalSecond
      this.timer = setInterval(() => {
        this.second--
        if (this.second === 0) {
          clearInterval(this.timer)
          this.second = 60
        }
      }, 1000)
    },
    // 校验手机号和图形验证码是否合法
    validFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('请输入正确图形验证码')
        return false
      }
      return true
    },
    async login () {
      if (!this.validFn()) {
        return false
      }
      if (!/^\d{6}$/.test(this.smsCode)) {
        this.$toast('请输入正确短信验证码')
        return false
      }
      const res = await codeLogin(this.mobile, this.smsCode)
      this.$store.commit('user/setUserInfo',
        res.data)
      this.$toast('登录成功')
      await this.$router.push('/')
    }
  },
  created () {
    this.getPicCode()
  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<style scoped lang="less">
.body{
  background-color: white;
}
.container{
  margin: 49px 29px;
  .title{
    margin-bottom: 40px;
    h3{
      font-weight: normal;
      font-size: 26px;
    }
    p{
      color: gray;
      font-size: 14px;
      line-height: 40px;
    }
  }
  .form-item{
    border-bottom: 1px solid #f3f1f2;
    display: flex;
    align-items: center;
    .inp{
      display: block;
      height: 38px;
      font-size: 14px;
      flex: 1;
    }
    img{
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }
  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
