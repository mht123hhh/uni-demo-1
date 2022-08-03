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
    name: "MyLogin",
    data() {
      return {};
    },
    methods: {
      // 2. 调用 mapMutations 里的方法
      ...mapMutations('m_user', ['updateUserInfo', 'updateToken']),
      // 获取用户信息
      getUserInfo() {
        uni.getUserProfile({
          desc: '获取用户信息',
          success: res => {
            uni.showLoading({
              title: '登录中'
            })
            //-------------------------------------------
            // 模拟登录成功状态
            setTimeout(() => {
              uni.hideLoading(); //关闭登陆中状态
              uni.switchTab({
                url: '/pages/home/home'
              })
            }, 100)
            //--------------------------------------------
            // console.log(res) // 用户的信息
            // 3. 将用户的基本信息存储到 vuex 中
            this.updateUserInfo(res.userInfo)
            // 得到code获取token
            this.getToken(res)
          },
          fail() {
            uni.$showMsg('您取消了授权登录')
          }
        })
      },
      async getToken(info) {
        // 换取 code
        const [
          err,
          res
        ] = await uni.login().catch(err => err)
        if (err || res.errMsg !== 'login:ok') return uni.$showMsg('登录失败！')
        // 参数对象
        const query = {
          code: res.code,
          rawData: info.rawData,
          signature: info.signature,
          encryptedData: info.encryptedData,
          iv: info.iv
        }
        console.log(query);
        // 换取token
        // const {
        //   data: loginResult
        // } = await uni.$http.post('API', query)
        // if (loginResult.meta.status !== 200) return uni.$showMsg('登录失败！')
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
