const p1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve('resolve3');
    console.log('timer1')
  }, 0)
  resolve('resolve1');
  resolve('resolve2');
}).then(res => {
  console.log(res)
  setTimeout(() => {
    console.log(p1)
  }, 1000)
}).finally(res => {
  console.log('finally', res)
})

// resolve1
//?# finally的回调函数接收不到Promise的结果
// finally undefined
// timer1
//! Promise<fulfilled, undefined>

// * 最后一个定时器打印的 p1 其实是 finally 的返回值
// * finally的返回值如果在没有抛出错误的情况下默认会是上一个Promise的返回值
// * 而这道题中.finally上一个Promise是.then(),这个.then()没有返回值所以是undefined
