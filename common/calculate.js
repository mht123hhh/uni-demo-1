function addDay1(countArr) {
  var len = countArr.length;
  if (len == 0) {
    return 0;
  } else if (len == 1) {
    return Number(countArr[0]);
  } else {
    return Number(countArr[0]) + addDay(countArr.slice(1));
  }
}

function addDay(arr) {
  var s = 0;
  for (var i = arr.length - 1; i >= 0; i--) {
    s += arr[i];
  }
  return s;
}

export default {
  addDay
}
