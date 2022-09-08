const async1 = async () => {
  console.log('async1');
  setTimeout(() => { // 第二轮宏任务1
    console.log('timer1')
  }, 2000)
  await new Promise(resolve => {
    console.log('promise1') // 没有返回值，后面不执行
  })
  console.log('async1 end')
  return 'async1 success'
}
console.log('script start');
async1().then(res => console.log(res));
console.log('script end');
Promise.resolve(1)  // 第一轮微任务2
  .then(2)
  .then(Promise.resolve(3))
  .catch(4)
  .then(res => console.log(res))
setTimeout(() => { // 第二轮宏任务2
  console.log('timer2')
}, 1000)

// script start
// async1
// promise1
// script end
// 1
// timer2
// timer1
