<template>
  <view class="container-box">
    <view class="day-flow">
      <view class="client-box">
        <view class="client-name">
          <!-- {{fullName + query.status}} -->
          {{status==='设备离线'?fullName + '  ('+ status +')':fullName}}
        </view>
      </view>
      <view class="charts-box" v-if="chartData">
        <qiun-data-charts class="vue" type="line" :opts="opts" :chartData="chartData" :canvas2d="true" loadingType=5
          errorShow="true" :ontouch="true" canvasId="hhh" />
      </view>
    </view>
  </view>
</template>

<script>
  import dateObj from '@/common/datefilter.js'
  export default {
    data() {
      return {
        query: {
          guid: '',
          beginTime: '',
          endTime: '',
          interval: '1'
        },
        fullName: '',
        errorShow: 'false',
        status: '',
        chartData: {},
        // 是否宽屏
        isLandScape: false,
        //您可以通过修改 config-ucharts.js 文件中下标为 ['column'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
        opts: {
          color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
          padding: [15, 15, 0, 5],
          legend: {
            position: 'top',
            // float: 'left'
          },
          dataLabel: false, // 数据文本
          dataPointShape: false, // 数据图形
          xAxis: {
            disableGrid: true,
            labelCount: 7
          },
          yAxis: {
            data: [{
              min: 0,
              title: 'kbps',
              titleOffsetY: -5,
              // 隐藏 y 轴坐标线
              axisLine: false
            }],
            showTitle: true
          },
          extra: {
            column: {
              type: "group",
              width: 30,
              activeBgColor: "#000000",
              activeBgOpacity: 0.08
            },
            tooltip: {
              horizentalLine: true,
              xAxisLabel: true,
              yAxisLabel: true,
              labelBgColor: '#ffffff',
              labelFontColor: '#C00000'
            }
          }
        }
      };
    },
    onReady() {
      console.log("1")
      this.getServerData()
    },
    onShow() {
      console.log("2")
    },
    onLoad(options) {
      // console.log(options)
      console.log("3")
      this.query.guid = options.guid
      this.query.beginTime = dateObj.dateFormat2(new Date())
      this.query.endTime = dateObj.dateFormat1(new Date())
      this.fullName = options.fullName
      // this.getServerData()
    },

    methods: {
      async getServerData() {
        const {
          data: res
        } =
        await uni.$http.get('/flow/newCountLine', this.query)
        console.log(res)
        if (res.code === -1) {
          this.status = res.message
          this.errorShow = true
          return uni.$showMsg('暂无数据！', 1000 * 10)
        }
        let dataObj = {
          categories: dateObj.dateFormat(res.data.dateCreated),
          series: [{
              name: "上行流量",
              data: res.data.countLineFlowIn
            },
            {
              name: "下行流量",
              data: res.data.countLineFlowOut
            }
          ]
        };
        this.chartData = JSON.parse(JSON.stringify(dataObj));
      }
    },
  };
</script>

<style lang="scss">
  .container-box {
    .client-box {
      // position: relative;
      // padding-left: 20px;

      // &::before {
      //   position: absolute;
      //   content: "";
      //   display: block;
      //   border-radius: 10px;
      //   background-color: #0ea8e4;
      //   width: 5px;
      //   height: 18px;
      //   top: 2px;
      //   left: 3px;
      // }

      display: flex;
      justify-content: center;
      align-items: center;
      margin: 10px 0 0 0;

      .client-name {
        font-weight: 700;
      }
    }

    /* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
    .charts-box {
      width: 100%;
      height: 300px;
    }
  }
</style>
