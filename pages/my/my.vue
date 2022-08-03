<template>
  <view>
    <my-login1 v-if="!token"></my-login1>
    <my-userinfo v-else></my-userinfo>
  </view>
</template>
<script>
  import {
    mapState
  } from "vuex"
  export default {
    computed: {
      ...mapState('m_user', ['token'])
    },
    data() {
      return {
        isLogin: true
      }
    },

    onInit() {
      if (!this.$store.state.m_user.token) {
        uni.switchTab({
          url: '/pages/my/my'
        })
      }
    },
    onLoad() {
      if (!this.$store.state.m_user.token) {
        uni.switchTab({
          url: '/pages/my/my'
        })
      }
      // console.log(1)
      console.log('TOKEN:', this.$store.state.m_user.token)
    },
    methods: {

    }
  }
</script>
