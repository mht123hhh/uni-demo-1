// 2022-06-17 22:10:33  => 22:10:33
function dateFormat(dateArr) {
  return dateArr.map(item => {
    return item = item.split(' ')[1].substring(0, 5)
  })
}
// 2022-06-17 22:10:33  => 06-17
function getDate(dateArr) {
  return dateArr.map(item => {
    return item = item.split(' ')[0].substring(5, 10)
  })
}
// 补零函数
function addZero(m) {
  return m = m < 10 ? '0' + m : m
}
// 2022-06-17 22:10:33 => 2022-06-18 00:00:00
function dateFormat1(date) {
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  let d = date.getDate() + 1
  return date = y + '-' + addZero(m) + '-' + d + ' ' + '00:00:00'
}
// 2022-06-17 22:10:33 => 2022-06-17 00:00:00
function dateFormat2(date) {
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  let d = date.getDate()
  return date = y + '-' + addZero(m) + '-' + d + ' ' + '00:00:00'
}

// 获取现在的时间
function getNowDate() {
  const yy = new Date().getFullYear()
  const MM = (new Date().getMonth() + 1) < 10 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)
  const dd = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()
  const HH = new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()
  const mm = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()
  const ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds()
  return yy + '-' + MM + '-' + dd + ' ' + HH + ':' + mm + ':' + ss
}

// 获取周一和周日对应的日期
function getWeekFormat(now) {
  var nowTime = now.getTime();
  var day = now.getDay();
  var oneDayTime = 24 * 60 * 60 * 1000;
  //显示周一
  var MondayTime = nowTime - (day - 1) * oneDayTime;
  //显示周日
  var SundayTime = nowTime + (8 - day) * oneDayTime;
  //初始化日期时间
  var monday = dateFormat2(new Date(MondayTime));
  var sunday = dateFormat2(new Date(SundayTime));
  //打印查看结果
  // console.log(monday); //返回结果为时间戳
  // console.log(sunday);
  return {
    'monday': monday,
    'sunday': sunday
  }
}
// 获取月最后一天
function getMonthLastDate() {
  let date = new Date()
  let y = date.getFullYear()
  let m = addZero((date.getMonth() + 1))
  let d = addZero(date.getDate())
  let dateObj = new Date(y, m, 0); //注意：这里传入月份取值范围是0-11
  let theMonthLastDay = y + '-' + m + '-' + dateObj.getDate() + ' ' + '00:00:00'
  return theMonthLastDay
}
// 获取下个月初一天
function getNextMonthFirstDate() {
  let date = new Date()
  let y = date.getFullYear()
  let m = addZero((date.getMonth() + 2))
  let theNextMonthFirstDay = y + '-' + m + '-01' + ' ' + '00:00:00'
  return theNextMonthFirstDay
}
// 获取月初的一天
function getMonthFirstDate() {
  let date = new Date()
  let y = date.getFullYear()
  let m = addZero((date.getMonth() + 1))
  let theMonthFirstDay = y + '-' + m + '-01' + ' ' + '00:00:00'
  return theMonthFirstDay
}




export default {
  dateFormat,
  dateFormat1,
  dateFormat2,
  getWeekFormat,
  getDate,
  getMonthLastDate,
  getMonthFirstDate,
  getNextMonthFirstDate,
  getNowDate
}
