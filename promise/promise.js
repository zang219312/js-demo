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
      item.onRejected()
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
  const self = this
  // 判断回调函数参数
  if (typeof onRejected !== 'function') {
    onRejected = reason => {
      throw reason
    }
  }

  if (typeof onResolved !== 'function') {
    onResolved = res => res
  }
  return new MyPromise((resolve, reject) => {
    function callback(type) {
      try {
        const result = type(self.PromiseResult)
        // 如果是 MyPromise 实例
        if (result instanceof MyPromise) {
          result.myThen(
            v => resolve(v),
            r => reject(r)
          )
        } else {
          resolve(result)
        }
      } catch (e) {
        reject(e)
      }
    }

    if (this.PromiseState === 'fulfilled') {
      // 回调的执行结果
      callback(onResolved)
    }

    if (this.PromiseState === 'rejected') {
      callback(onRejected)
    }

    // 判断pending 状态
    if (this.PromiseState === 'pending') {
      // 保存回调函数
      this.callbacks.push({
        onResolved() {
          callback(onResolved)
        },
        onRejected() {
          callback(onRejected)
        }
      })
    }
  })
}

MyPromise.prototype.myCatch = function (onRejected) {
  return this.myThen(undefined, onRejected)
}

MyPromise.resolve = function (val) {
  return new MyPromise((resolve, reject) => {
    if (val instanceof MyPromise) {
      val.myThen(
        v => resolve(v),
        r => reject(r)
      )
    } else {
      resolve(val)
    }
  })
}

MyPromise.reject = function (reason) {
  return new MyPromise((resolve, reject) => {
    reject(reason)
  })
}

MyPromise.all = function (promises) {
  return new MyPromise((resolve, reject) => {
    let count = 0
    let arr = []
    for (let i = 0; i < promises.length; i++) {
      promises[i].myThen(
        v => {
          // 对象的状态是成功
          // 每个promise对象的状态 都成功
          count += 1
          arr[i] = v

          if (count === promises.length) {
            resolve(arr)
          }
        },
        r => reject(r)
      )
    }
  })
}

MyPromise.race = function (promises) {
  return new MyPromise((resolve, reject) => {
    for (const item of promises) {
      item.myThen(
        v => {
          // 修改返回promise对象的状态时成功
          resolve(v)
        },
        r => reject(r)
      )
    }
  })
}
