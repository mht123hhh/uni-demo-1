<template>
  <view>
    <view class="my-userinfo-container">
      <!-- 头部用户区域 -->
      <view class="top-box">
        <image :src="userInfo.avatarUrl" class="avatar"></image>
        <view class="nickname">{{userInfo.nickName}}</view>
      </view>
      <!-- 面板区域 -->
      <view class="panel-list">
        <view class="panel-top">
          <view class="panel-item">
            <text>8</text>
            <text>客户公司</text>
          </view>
          <view class="panel-item">
            <text>8</text>
            <text>设备</text>
          </view>
        </view>
        <view class="panel-footer">
          <view class="contact panel-footer-item">
            <text>联系客服</text>
            <uni-icons type="right" size="17"></uni-icons>
          </view>
          <view class="logout panel-footer-item" @click="logout">
            <text>退出登录</text>
            <uni-icons type="right" size="17"></uni-icons>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'

  export default {
    name: "MyUserInfo",
    data() {
      return {

      }
    },
    methods: {
      ...mapMutations('m_user', ['updateUserInfo', 'updateToken']),
      async logout() {
        // uni回调中的解构
        const [err, succ] = await uni.showModal({
          title: '提示',
          content: '确认退出登录吗？'
        }).catch(err => err)
        if (err || succ.errMsg !== 'showModal:ok') return uni.$showMsg('退出登录失败！')
        if (succ.cancel === true) {
          return uni.$showMsg('取消退出成功！')
        }
        // console.log(succ)
        this.updateUserInfo({})
        this.updateToken('')
      }
    },
    computed: {
      ...mapState('m_user', ['userInfo'])
    }
  }
</script>

<style lang="scss">
  .my-userinfo-container {
    height: 100%;
    background-color: #F4F4F4;

    .top-box {
      height: 400rpx;
      background-color: #1C6CFF;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .avatar {
        width: 90px;
        height: 90px;
        border-radius: 45px;
        border: 2px solid #FFF;
        background-color: pink;
        // box-shadow: 0 1px 5px black;
      }

      .nickname {
        font-size: 16px;
        color: #FFF;
        font-weight: blod;
        margin-top: 10px;
      }
    }

    .panel-list {
      position: relative;
      padding: 0 10px;
      top: -10px;

      .panel-top {
        display: flex;
        justify-content: space-around;
        background-color: white;
        border-radius: 3px;
        // height: 50px;
        margin-bottom: 10px;

        .panel-item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 10px 0;
          font-size: 13px;
        }
      }

      .panel-footer {
        background-color: white;

        .panel-footer-item {
          display: flex;
          justify-content: space-between;
          padding: 10px;
          font-size: 13px;
        }
      }
    }
  }
</style>
