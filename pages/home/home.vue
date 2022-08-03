<template>
  <view class="container-box" v-if="token">
    <view class="title">
      <text>流量情况</text>
    </view>
    <!-- 今日/本月流量 start -->
    <view class="count-flow">
      <!-- 今日流量 -->
      <view class="dayFlowCounts">
        <view class="dayFlow-title">
          <text>今日流量</text>
        </view>
        <view class="Flow-content">
          <text class="flow-m-r">上行：{{dayFlowCounts.upFlow}}</text>
          <text>下行：{{dayFlowCounts.downFlow}}</text>
        </view>
      </view>
      <!-- 本月流量 -->
      <view class="monthFlowCounts">
        <view class="monthFlow-title">
          <text>本月流量</text>
        </view>
        <view class="Flow-content">
          <text class="flow-m-r">上行：1G</text>
          <text>下行：100G</text>
        </view>
      </view>
    </view>
    <!-- 今日/本月流量 end -->
    <uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text"
      activeColor="#007aff"></uni-segmented-control>
    <view class="content">
      <!-- 一天流量 -->
      <view v-if="current === 0">
        <view class="day-flow">
          <view class="client-box">
            <view class="client-name">
              宁波驰恩国际有限公司
              {{status==='设备离线'?fullName + '  ('+ status +')':fullName}}
            </view>
          </view>
          <view class="charts-box">
            <qiun-data-charts class="vue" type="line" :opts="opts" :chartData="chartData1" :canvas2d="true"
              loadingType=5 errorShow="true" :ontouch="true" canvasId="day-flow" />
          </view>
        </view>
      </view>
      <!-- 一周流量 -->
      <view v-else-if="current === 1">
        <view class="week-flow">
          <view class="client-box">
            <view class="client-name">
              宁波驰恩国际有限公司
              {{status==='设备离线'?fullName + '  ('+ status +')':fullName}}
            </view>
          </view>
          <view class="charts-box">
            <qiun-data-charts class="vue" type="line" :opts="opts1" :chartData="chartData2" :canvas2d="true"
              loadingType=5 errorShow="true" :ontouch="true" canvasId="week-flow" />
          </view>
        </view>
      </view>
      <!-- 一月流量 -->
      <view v-else-if="current === 2">
        <view class="month-flow">
          <view class="client-box">
            <view class="client-name">
              宁波驰恩国际有限公司
              {{status==='设备离线'?fullName + '  ('+ status +')':fullName}}
            </view>
          </view>
          <view class="charts-box">
            <qiun-data-charts class="vue" type="line" :opts="opts1" :chartData="chartData3" :canvas2d="true"
              loadingType=5 errorShow="true" :ontouch="true" canvasId="month-flow" />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  // import countObj from '@/common/calculate.js'
  import dateObj from '@/common/datefilter.js'
  import {
    mapState
  } from "vuex"
  export default {
    computed: {
      ...mapState('m_user', ['token'])
    },
    data() {
      return {
        time: null,
        timer: null,
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
        dayFlowCounts: {
          upFlow: '',
          downFlow: ''
        },
        monthFlowCounts: {
          upFlow: '',
          downFlow: ''
        },
        fullName: '',
        errorShow: 'false',
        status: '',
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
            labelCount: 6
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
    // 点击tab触发
    onTabItemTap() {
      if (!this.$store.state.m_user.token) {
        this.time = setTimeout(() => {
          uni.switchTab({
            url: '/pages/my/my'
          })
        }, 2000)
        return uni.$showMsg('请先登录！', 3000)
      }
    },
    onLoad() {
      this.getDayflow()
      this.getWeekflow()
      this.getMonthflow()
      this.getDayFlowCounts()
    },
    onHide() {
      clearInterval(this.timer)
    },
    onShow() {
      // console.log(this.$store.state.m_user.token)
      // if (!this.$store.state.m_user.token) {
      //   this.time = setTimeout(() => {
      //     uni.switchTab({
      //       url: '/pages/my/my'
      //     })
      //   }, 2000)
      //   uni.$showMsg('请先登录！', 3000)
      // }
      /* this.getDayflow()
       this.getWeekflow()
       this.getMonthflow()
       this.getDayFlowCounts() */
      this.startTimer()
    },
    methods: {
      startTimer() {
        this.timer = setInterval(() => {
          this.getDayflow()
          this.getDayFlowCounts()
        }, 30000)
      },
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
        }
      },
      async getDayflow() {
        // 天
        this.query1.beginTime = dateObj.dateFormat2(new Date())
        // this.query1.endTime = dateObj.dateFormat1(new Date())
        // advice: 建议显示最近时间
        this.query1.endTime = dateObj.getNowDate()
        const {
          data: res
        } =
        await uni.$http.get('/flow/newCountLine', this.query1)
        // // 2022-06-17 22:10:33 => 2022-06-17 00:00:00
        const date = dateObj.dateFormat2(new Date())
        let categories = [date].concat(res.data.dateCreated)
        console.log(res, 'day')
        if (res.code === -1) {
          this.status = res.message
          this.errorShow = true
          return uni.$showMsg('设备离线！', 1000 * 10)
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
        // 周
        this.query2.beginTime = dateObj.getWeekFormat(new Date()).monday
        this.query2.endTime = dateObj.getWeekFormat(new Date()).sunday
        const {
          data: res
        } =
        await uni.$http.get('/flow/newCountLine', this.query2)
        console.log(res, 'week')
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
        // 月
        this.query3.beginTime = dateObj.getMonthFirstDate()
        this.query3.endTime = dateObj.getNextMonthFirstDate()
        const {
          data: res
        } =
        await uni.$http.get('/flow/newCountLine', this.query3)
        console.log(res, 'month')
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
      },
      async getDayFlowCounts() {
        const {
          data: res
        } = await uni.$http.get('/flow/countNowUnitFlowApplet', {
          unitGuid: '584bb4c000cc4d6c87fa1ce8d6754666'
        })
        if (res.code !== 200) return uni.$showMsg('获取流量统计失败！')
        this.dayFlowCounts.upFlow = res.data.in
        this.dayFlowCounts.downFlow = res.data.out
        // console.log(this.dayFlowCounts)
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

    .count-flow {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding: 10px 0;
      border-bottom: 1px solid #efefef;

      .Flow-content {
        font-size: 13px;

        .flow-m-r {
          margin-right: 20px;
        }
      }

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
