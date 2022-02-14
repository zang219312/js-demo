function MyPromise(executor) {
  this.PromiseState = 'pending'
  this.PromiseResult = null
  // 声明一个属性
  this.callbacks = []

  // resolve 函数
  function resolve(data) {
    if (this.PromiseState !== 'pending') return
    // ? 1.修改对象的状态 （promiseState）
    this.PromiseState = 'fulfilled' // resolved
    // ? 2.设置对象结果值 （promiseResult）
    this.PromiseResult = data
    // 调用成功的回调函数
    this.callbacks.forEach(item => {
      item.onResolved(data)
    })
  }

  // reject
  function reject(data) {
    if (this.PromiseState !== 'pending') return

    this.PromiseState = 'rejected'
    this.PromiseResult = data
    // 调用失败的回调函数

    this.callbacks.forEach(item => {
      item.onRejected(data)
    })
  }

  try {
    // 同步调用 【执行器函数】
    executor(resolve.bind(this), reject.bind(this))
  } catch (error) {
    // 修改 promise的状态为 【失败】
    reject.call(this, error)
  }
}

// add function myThen
MyPromise.prototype.myThen = function (onResolved, onRejected) {
  return new MyPromise((resolve, reject) => {
    if (this.PromiseState === 'fulfilled') {
      // 回调的执行结果
      try {
        console.log(onResolved(this.PromiseResult))

        const result = onResolved(this.PromiseResult)

        // 如果是 MyPromise 实例
        if (result instanceof MyPromise) {
          result.myThen(
            rsl => {
              resolve(rsl)
            },
            rej => {
              reject(rej)
            }
          )
        } else {
          resolve(result)
        }
      } catch (e) {
        reject(e + 'e')
      }
    }

    if (this.PromiseState === 'rejected') {
      onRejected(this.PromiseResult)
    }

    // 判断pending 状态
    if (this.PromiseState === 'pending') {
      // 保存回调函数
      this.callbacks.push({
        onResolved,
        onRejected
      })
    }
  })
}
