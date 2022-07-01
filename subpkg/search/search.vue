<template>
  <view>
    <!-- 搜索框-->
    <view class="search-box">
      <uni-search-bar radius="25" :focus="true" placeholder="请输入搜索内容" clearButton="always" cancelButton="none"
        @input="input" @confirm="search" @cancel="cancel" @clear="clear" />
    </view>
    <!-- 搜索列表 -->
    <view class="customer-list" v-if="searchList.length !== 0">
      <view class="customer-item" v-for="(item,i) in searchList" :key="i" @click="gotoDetail(item.guid,item.fullName)">
        <view class="customer-name">
          {{item.fullName}}
        </view>
        <uni-icons type="forward" size="18"></uni-icons>
      </view>
    </view>
    <!-- 搜索历史 -->
    <view class="history-box" v-else>
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="18" @click="clean"></uni-icons>
      </view>
      <view class="history-list">
        <uni-tag :text="item" :inverted="true" v-for="(item,i) in histories" :key="i" type="primary" size="normal" />
      </view>
    </view>
  </view>
</template>

<script>
  import dateObj from '@/common/datefilter.js'
  export default {
    data() {
      return {
        timer: null,
        kw: '',
        searchList: [],
        historyList: []
      };
    },
    computed: {
      histories() {
        return [...this.historyList].reverse()
      },
    },
    onLoad() {
      this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
      this.getSearchList()
    },
    methods: {
      // 开启防抖 触发最后一次
      input(value) {
        // 清除之前的timer
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.kw = value.trim()
          // console.log(this.kw)
          this.getSearchList()
        }, 500)
      },
      async getSearchList() {
        if (this.kw.length === 0) return this.searchList = []
        const {
          data: res
        } = await uni.$http.get('unit/appletFindUnitBasicByCon', {
          pageNum: 1,
          pageSize: 99999,
          fullName: this.kw
        })
        console.log(res)
        if (res.code !== 200) return uni.$showMsg('获取客户记录失败！')
        this.searchList = res.data.list
        this.saveSearchHistory()
      },
      // 清除所有历史记录
      clean() {
        this.historyList = []
        uni.setStorageSync('kw', '[]')
        uni.$showMsg('删除历史搜索记录成功！')
      },
      saveSearchHistory() {
        const myset = new Set(this.historyList)
        myset.delete(this.kw)
        myset.add(this.kw)
        this.historyList = Array.from(myset)
        uni.setStorageSync('kw', JSON.stringify(this.historyList))
      },
      gotoDetail(guid, fullName) {
        uni.navigateTo({
          url: '/subpkg/clientFlow_detail/clientFlow_detail?guid=' + guid + '&fullName=' + fullName
          // url: '/pages/test/test?guid=' + guid + '&fullName=' + fullName
        })
      }
    }
  }
</script>

<style lang="scss">
  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;
  }

  .customer-list {
    padding: 0 5px;

    .customer-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 13px 0;
      border-bottom: 1px solid #efefef;
      font-size: 12px;

      .customer-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .history-box {
    padding: 5px;

    .history-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 5px;
      font-size: 13px;
      border-bottom: 2px solid #efefef;
    }

    .history-list {

      uni-tag {
        float: left;
        margin: 5px;
      }

    }
  }
</style>
