<template>
  <view class="charts-box">
    <qiun-data-charts type="ring" :opts="opts" :chartData="chartData" :canvas2d="true" canvasId="ring" />
  </view>
</template>

<script>
  export default {
    name: "UchartsRing",
    props: {
      dayCounts: Number,
      upCounts: Number,
      downCounts: Number
    },
    data() {
      return {
        chartData: {},
        opts: {
          rotate: false,
          rotateLock: false,
          color: ["#1890FF", "#91CB74"],
          padding: [5, 5, 5, 5],
          dataLabel: true,
          legend: {
            show: true,
            position: "right",
            lineHeight: 25
          },
          title: {
            name: "流量总耗 (kbps)",
            fontSize: 15,
            color: "#666666"
          },
          subtitle: {
            name: "99999",
            fontSize: 25,
            color: "#7cb5ec"
          },
          extra: {
            ring: {
              ringWidth: 15,
              activeOpacity: 0.5,
              activeRadius: 10,
              offsetAngle: 0,
              labelWidth: 15,
              border: false,
              borderWidth: 3,
              borderColor: "#FFFFFF"
            }
          }
        }
      };
    },
    onReady() {
      this.getServerData()
      setInterval(() => {
        this.getServerData()
      }, 1000)
    },
    methods: {
      getServerData() {
        //模拟从服务器获取数据时的延时
        setTimeout(() => {
          //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
          let res = {
            series: [{
              data: [{
                "name": "上行流量",
                "value": this.upCounts
              }, {
                "name": "下行流量",
                "value": this.downCounts
              }]
            }]
          };
          this.chartData = JSON.parse(JSON.stringify(res));
          this.opts.subtitle.name = this.dayCounts
        }, 0);
      },
    }
  };
</script>

<style scoped>
  /* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
  .charts-box {
    width: 100%;
    height: 300px;
  }
</style>
