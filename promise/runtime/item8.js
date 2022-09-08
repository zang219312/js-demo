async function async1 () {
  await async2();
  console.log('async1');
  return 'async1 success'
}
async function async2 () {
  return new Promise((resolve, reject) => {
    console.log('async2')
    reject('error')
  })
}
async1().then(res => console.log(res))

// async2
// Uncaught (in promise) error

// ? await后面跟着的是一个状态为rejected的promise
// ? 如果在async函数中抛出了错误，则终止错误结果，不会继续向下执行。
