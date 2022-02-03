function MyPromise(executor) {
  this.PromiseState = 'pending'
  this.PromiseResult = null

  // resolve 函数
  function resolve(data) {
    if (this.PromiseState !== 'pending') return
    // ? 1.修改对象的状态 （promiseState）
    this.PromiseState = 'fulfilled' // resolved
    // ? 2.设置对象结果值 （promiseResult）
    this.PromiseResult = data
  }

  // reject
  function reject(data) {
    if (this.PromiseState !== 'pending') return

    this.PromiseState = 'rejected'
    this.PromiseResult = data
  }

  try {
    // 同步调用 【执行器函数】
    executor(resolve.bind(this), reject.bind(this))
  } catch (error) {
    // 修改 promise的状态为 【失败】
    reject.call(this, error)
  }
}

// add function ·then·
MyPromise.prototype.then = function (onResolved, onRejected) {
  /* console.log(onResolved)
  console.log(onResolved) */
}
