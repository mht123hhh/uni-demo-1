<template>
  <view class="container-box">
    <view class="title">
      <text>流量情况</text>
    </view>
    <uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text"
      activeColor="#007aff"></uni-segmented-control>
    <view class="content">
      <!-- 一天流量 -->
      <view v-if="current === 0">
        <view class="day-flow">
          <view class="client-box">
            <view class="client-name">
              哇哈哈
              {{status==='设备离线'?fullName + '  ('+ status +')':fullName}}
            </view>
          </view>
          <view class="charts-box">
            <qiun-data-charts class="vue" type="line" :opts="opts" :chartData="chartData1" :canvas2d="true"
              loadingType=5 errorShow="true" :ontouch="true" canvasId="day-flow" />
          </view>
          <ucharts-ring :dayCounts="dayCounts" :upCounts="upCounts1" :downCounts="downCounts1"></ucharts-ring>
        </view>
      </view>
      <!-- 一周流量 -->
      <view v-else-if="current === 1">
        <view class="week-flow">
          <view class="client-box">
            <view class="client-name">
              {{status==='设备离线'?fullName + '  ('+ status +')':fullName}}
            </view>
          </view>
          <view class="charts-box">
            <qiun-data-charts class="vue" type="line" :opts="opts1" :chartData="chartData2" :canvas2d="true"
              loadingType=5 errorShow="true" :ontouch="true" canvasId="week-flow" />
          </view>
          <ucharts-ring :dayCounts="weekCounts" :upCounts="upCounts2" :downCounts="downCounts2"></ucharts-ring>
        </view>
      </view>
      <!-- 一月流量 -->
      <view v-else-if="current === 2">
        <view class="month-flow">
          <view class="client-box">
            <view class="client-name">
              {{status==='设备离线'?fullName + '  ('+ status +')':fullName}}
            </view>
          </view>
          <view class="charts-box">
            <qiun-data-charts class="vue" type="line" :opts="opts1" :chartData="chartData3" :canvas2d="true"
              loadingType=5 errorShow="true" :ontouch="true" canvasId="month-flow" />
          </view>
          <ucharts-ring :dayCounts="monthCounts" :upCounts="upCounts3" :downCounts="downCounts3"></ucharts-ring>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import countObj from '@/common/calculate.js'
  import dateObj from '@/common/datefilter.js'
  export default {
    computed: {},
    data() {
      return {
        items: ['一天', '一周', '一个月'],
        current: 0,
        query1: {
          guid: '584bb4c000cc4d6c87fa1ce8d6754666',
          beginTime: '',
          endTime: '',
          interval: '1'
        },
        query2: {
          guid: '584bb4c000cc4d6c87fa1ce8d6754666',
          beginTime: '',
          endTime: '',
          interval: '60'
        },
        query3: {
          guid: '584bb4c000cc4d6c87fa1ce8d6754666',
          beginTime: '',
          endTime: '',
          interval: '720'
        },
        chartData1: {},
        chartData2: {},
        chartData3: {},
        dayCounts: 0,
        weekCounts: 0,
        monthCounts: 0,
        upCounts1: 0,
        downCounts1: 0,
        upCounts2: 0,
        downCounts2: 0,
        upCounts3: 0,
        downCounts3: 0,
        fullName: '',
        errorShow: 'false',
        status: '',
        // 是否宽屏
        isLandScape: false,
        opts: {
          padding: [15, 15, 0, 5],
          legend: {
            position: 'top',
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
        },
        opts1: {
          padding: [15, 15, 0, 5],
          legend: {
            position: 'top',
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
      }
    },
    watch: {
      dayCounts(newValue, oldValue) {
        this.dayCounts = newValue
        // console.log(newValue + '---' + oldValue)
      },
      upCounts(newValue, oldValue) {
        this.dayCounts = newValue
      },
      downCounts(newValue, oldValue) {
        this.downCounts = newValue
      }
    },
    onReady() {},
    onLoad() {
      // 天
      this.query1.beginTime = dateObj.dateFormat2(new Date())
      this.query1.endTime = dateObj.dateFormat1(new Date())
      // 周
      this.query2.beginTime = dateObj.getWeekFormat(new Date()).monday
      this.query2.endTime = dateObj.getWeekFormat(new Date()).sunday
      // 月
      this.query3.beginTime = dateObj.getMonthFirstDate()
      this.query3.endTime = dateObj.getNextMonthFirstDate()
      this.getDayflow()
      this.getWeekflow()
      this.getMonthflow()
      setInterval(() => {
        this.getDayflow()
        this.getWeekflow()
        this.getMonthflow()
      }, 10000)
    },
    methods: {
      onClickItem(e) {
        if (this.current != e.currentIndex) {
          this.current = e.currentIndex;
        }
        if (e.currentIndex === 0) {
          console.log('一天')
        } else if (e.currentIndex === 1) {
          console.log('一周')
        } else {
          console.log('一月')
          // this.opts.xAxis.labelCount = 7
        }
      },
      async getDayflow() {
        const {
          data: res
        } =
        await uni.$http.get('/flow/newCountLine', this.query1)
        let categories = ['2022-06-21 00:00:00'].concat(res.data.dateCreated)
        this.upCounts1 = countObj.addDay(res.data.countLineFlowIn)
        this.downCounts1 = countObj.addDay(res.data.countLineFlowOut)
        this.dayCounts = this.upCounts1 + this.downCounts1
        // console.log(this.dayCounts)
        console.log(res)
        if (res.code === -1) {
          this.status = res.message
          this.errorShow = true
          return uni.$showMsg('暂无数据！', 1000 * 10)
        }
        let dataObj = {
          categories: dateObj.dateFormat(categories),
          series: [{
              name: "上行流量",
              data: ['0'].concat(res.data.countLineFlowIn)
            },
            {
              name: "下行流量",
              data: ['0'].concat(res.data.countLineFlowOut)
            }
          ]
        };
        this.chartData1 = JSON.parse(JSON.stringify(dataObj));
      },
      async getWeekflow() {
        const {
          data: res
        } =
        await uni.$http.get('/flow/newCountLine', this.query2)
        this.upCounts2 = countObj.addDay(res.data.countLineFlowIn)
        this.downCounts2 = countObj.addDay(res.data.countLineFlowOut)
        this.weekCounts = this.upCounts2 + this.downCounts2
        console.log(res)
        if (res.code === -1) {
          this.status = res.message
          this.errorShow = true
          return uni.$showMsg('暂无数据！', 1000 * 10)
        }
        let dataObj = {
          categories: dateObj.getDate(res.data.dateCreated),
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
        this.chartData2 = JSON.parse(JSON.stringify(dataObj));
      },
      async getMonthflow() {
        const {
          data: res
        } =
        await uni.$http.get('/flow/newCountLine', this.query3)
        this.upCounts3 = countObj.addDay(res.data.countLineFlowIn)
        this.downCounts3 = countObj.addDay(res.data.countLineFlowOut)
        this.monthCounts = this.upCounts3 + this.downCounts3
        console.log(res)
        if (res.code === -1) {
          this.status = res.message
          this.errorShow = true
          return uni.$showMsg('暂无数据！', 1000 * 10)
        }
        let dataObj = {
          categories: dateObj.getDate(res.data.dateCreated),
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
        this.chartData3 = JSON.parse(JSON.stringify(dataObj));
      }
    }
  };
</script>

<style lang="scss">
  .container-box {
    padding: 0 10px;

    .title {
      font-size: 20px;
      font-weight: 700;
      margin: 10px 0 20px 0;
    }

    .content {
      .client-box {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px 0 0 0;

        .client-name {
          font-weight: 700;
        }
      }

      .charts-box {
        width: 100%;
        height: 300px;
      }
    }

  }
</style>
