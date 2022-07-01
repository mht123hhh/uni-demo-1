<template>
  <view class="my">
    <view class="my-search-container" :style="{'background-color':bgColor}">
      <view class="my-search-box" :style="{'border-radius':radius+'px'}" @click="searchHandler">
        <uni-icons type="search" size="17"></uni-icons>
        <text class="placeholder">搜索</text>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "my-search",
    props: {
      bgColor: {
        type: String,
        default: '#C00000'
      },
      radius: {
        type: Number,
        // 单位是 px 
        default: 25
      }
    },
    data() {
      return {

      };
    },
    methods: {
      searchHandler() {
        // console.log('```');
        // 给父组件发送自定义事件
        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss">
  // 吸顶设置
  .my {
    position: sticky;
    top: 0;
    z-index: 999;
  }

  .my-search-container {
    // position: absolute; // 不在占有原来的位置
    display: flex;
    align-items: center;
    height: 50px;
    padding: 0 10px;
    // 由组件的 props 属性决定
    // background-color: #C00000;

    // 使用flex布局 更方便 图标和字体同一水平垂直居中 
    .my-search-box {
      display: flex;
      justify-content: center; // 水平居中
      align-items: center; // 子项垂直居中
      width: 100%;
      height: 36px;
      background-color: #fff;
      // 由组件的 props 属性决定
      // border-radius: 25px;

      .placeholder {
        margin-left: 5px;
        font-size: 15px;
      }
    }

  }
</style>
