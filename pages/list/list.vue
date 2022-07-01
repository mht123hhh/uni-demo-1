<template>
  <view class="container-box">
    <my-search @click="gotoSearch" :bgColor="'#f5f5f5'"></my-search>
    <uni-list>
      <uni-list :border="true" v-for="(item,i) in searchList" :key="i">
        <!-- 显示圆形头像 -->
        <uni-list-chat :title="item.shortName" note="上行流量+下行流量" :time="'创建时间：'+item.createdAt"></uni-list-chat>
        </uni-list-chat>
      </uni-list>
    </uni-list>
  </view>

</template>

<script>
  export default {
    data() {
      return {
        searchList: [],
      }
    },
    onReady() {},
    onLoad() {
      this.getSearchList()
    },
    methods: {
      gotoSearch() {
        // console.log(1)
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      },
      async getSearchList() {
        const {
          data: res
        } = await uni.$http.get('unit/appletFindUnitBasicByCon', {
          pageNum: 1,
          pageSize: 8
        })
        console.log(res)
        if (res.code !== 200) return uni.$showMsg('获取客户记录失败！')
        this.searchList = res.data.list
      },
    }
  };
</script>

<style lang="scss">
  .chat-custom-right {
    flex: 1;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
  }

  .chat-custom-text {
    font-size: 12px;
    color: #999;
  }
</style>
