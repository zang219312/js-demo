// ? 实现mergePromise函数，把传进去的数组按顺序先后执行，并且把返回的数据先后放到数组data中
const sleep = (timer, type) => {
  return new Promise(resolve => {
    console.log('sleep', type)
    setTimeout(() => resolve(), timer)
  })
}
const ajax1 = () => sleep(3000, 'ajax1').then(() => {
  console.log(1);
  return 1
})
const ajax2 = () => sleep(3000, 'ajax2').then(() => {
  console.log(2);
  return 2
})
const ajax3 = () => sleep(3000, 'ajax3').then(() => {
  console.log(3);
  return 3
})

// * 定义一个数组data用于保存所有异步操作的结果
// * 初始化一个 promise = Promise.resolve()，然后循环遍历数组，在promise后面添加执行ajax任务，同时要将添加的结果重新赋值到promise上。
function mergePromise(ajaxArr) {
  // code here
  const data = []
  let pro = Promise.resolve(33)
  ajaxArr.forEach((ajax,k) => {
    /**
     * 开始循环时执行同步代码，循环 3 次
     * pro 的状态已经改变，[ajax 回调]添加到微队列中等待执行，[res 回调]加入微队列
     * todo processOn
     */

    // 循环里第一个 then 是调用ajax的
    // 第二个 then 是为了获取ajax的结果
    console.log(`pro ${k}`,pro)
    pro = pro.then(ajax).then(res => {
      data.push(res)
      return data
    })
  })
  return pro
}

mergePromise([ajax1, ajax2, ajax3]).then(data => {
  console.log('data', data) // [1,2,3]
  return 'result'
})
