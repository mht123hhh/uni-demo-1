<template>
  <view class="login-container">
    <view>
      <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    </view>
    <button type="primary" class="btn-login" open-type="getUserInfo" @click='getUserInfo'>一键登录</button>
    <text class="tips-text">登录后尽享更多权益</text>
  </view>
</template>

<script>
  // 1. 按需导入 mapMutations 函数
  import {
    mapMutations
  } from 'vuex'
  export default {
    name: "MyLogin1",
    data() {
      return {};
    },
    methods: {
      // 2. 调用 mapMutations 里的方法
      ...mapMutations('m_user', ['updateUserInfo', 'updateToken']),
      // 获取用户信息
      getUserInfo() {
        setTimeout(() => {
          uni.switchTab({
            url: '/pages/home/home'
          })
        }, 1000)
        this.getToken()
      },
      getToken() {
        uni.$showMsg('登录成功！')
        // 更新 vuex 中的 token
        this.updateToken('token')
      }
    }
  }
</script>

<style lang="scss">
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 750rpx;
    background-color: #F8F8F8;
    position: relative;

    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 40px;
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: #F5F5F5;
      transform: translateY(50%);
      border-radius: 100%;

    }

    .btn-login {
      width: 80%;
      margin: 15px 0;
      border-radius: 100px;
      background-color: #1C6CFF;
    }

    .tips-text {
      font-size: 12px;
      color: gray;
    }
  }
</style>
