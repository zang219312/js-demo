async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}

async function async2() {
  setTimeout(() => {
    console.log('timer')
  }, 0)
  console.log('async2')
}

let a = async1()
console.log('start')

// async1 start
// async2
// start
// async1 end
// timer

/**
 * 分析：
 * 我们先不看函数的创建位置，而是看它的调用位置
 * async1 被调用了，执行函数中的同步代码 'async1 start' ,之后碰到了 await ，阻塞了 async1 后面代码的执行，
 *      因此先去执行 async2() 中的同步代码 'async2',跳出 async1,执行同步代码 ‘start’
 * 在一轮宏任务全部执行完之后，再来执行await后面的 ‘async1 end’
 *      紧跟着await后面的语句相当于放到了new Promise中，下一行及之后的语句相当于放在Promise.then中
 * 定时器始终还是最后执行的，它被放到下一条宏任务的延迟队列中。
 */
