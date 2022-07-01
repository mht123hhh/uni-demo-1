export default {
  namespaced: true,

  state: () => ({
    // 获取用户信息
    userInfo: JSON.parse(uni.getStorageSync('userInfo') || '{}'),
    token: uni.getStorageSync('token') || ''
  }),

  mutations: {
    // 更新用户信息
    updateUserInfo(state, userInfo) {
      state.userInfo = userInfo
      console.log(userInfo);
      this.commit('m_user/saveUserInfoToStorage')
    },
    // 将userInfo持久化存储到本地
    saveUserInfoToStorage(state) {
      uni.setStorageSync('userInfo', JSON.stringify(state.userInfo))
    },
    // 更新token
    updateToken(state, token) {
      state.token = token
      this.commit('m_user/saveTokenToStorage')
    },
    // 持久化存储 token
    saveTokenToStorage(state) {
      uni.setStorageSync('token', state.token)
    }
  },
  getters: {
    total(state) {
      let c = 0
      state.cart.forEach(x => c += x.goods_count)
      return c
    }
  }
}
