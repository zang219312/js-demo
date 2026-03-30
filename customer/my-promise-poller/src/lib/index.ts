interface IOptions {
  taskFn: Function
  interval: number
  shouldContinue: (err: string | null, result?: any) => boolean // 单次轮询后是否继续
  masterTimeout?: number // 整个轮询过程的 timeout 时长
  taskTimeout?: number // 单次轮询的 timeout 时长
  retries?: number // 轮询任务失败后重试次数
  progressCallback?: (retriesRemain: number, error: Error) => unknown // 剩余次数回调
}

export const delay = (interval: number) => {
  return new Promise(resolve => setTimeout(resolve, interval))
}

// * 判断该 promise 是否超时了
const checkTimeout = <T>(promise: Promise<T>, interval: number): Promise<T> => {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject('task timeout')
    }, interval)

    promise.then(result => {
      clearTimeout(timeoutId)
      resolve(result) // 任务完成，清除 timeoutId
    })
  })
}

export const promisePoller = (options: IOptions) => {
  const {
    taskFn,
    interval,
    masterTimeout,
    shouldContinue,
    taskTimeout,
    retries = 5,
    progressCallback
  } = options

  let polling = true
  let timeoutId: ReturnType<typeof setTimeout> | null | number
  let rejections: Array<Error | string> = []
  let retriesRemain = retries

  return new Promise((resolve, reject) => {
    if (masterTimeout) {
      timeoutId = setTimeout(() => {
        reject(new Error('master Timeout')) // 整个轮询超时
        polling = false
      }, masterTimeout)
    }
    const poll = () => {
      let taskResult = taskFn()

      if (taskResult === false) {
        // 结束同步任务
        taskResult = Promise.reject(taskResult)
        reject(rejections)
        polling = false
      }

      let taskPromise = Promise.resolve(taskResult)

      if (taskTimeout) {
        taskPromise = checkTimeout(taskPromise, taskTimeout)
      }
      taskPromise
        .then(result => {
          if (shouldContinue(null, result)) {
            delay(interval).then(poll) // 继续轮询
          } else {
            // 不需要轮询，有 timeoutId 则清除
            if (timeoutId !== null) {
              clearTimeout(timeoutId)
            }
            resolve(result) //结束并返回最后一次 taskFn 的结果
          }
        })
        .catch(err => {
          console.log('taskPromise err:', err.message)

          if (err.message === 'CANCEL_TOKEN') {
            // 结束异步任务
            reject(rejections)
            polling = false
          }

          // 判断 retries 是否为 0（重试次数还没用完） 和 shouldContinue 的值是否为 true（我真的要重试啊），以此来确定是否真的需要重试。只有两者都为 true 时才重试。
          rejections.push(err) // 加入 rejections 错误列表

          if (progressCallback) {
            progressCallback(retriesRemain, err) // 回调获取 retriesRemain
          }

          // 判断是否需要重试
          if (--retriesRemain === 0 || !shouldContinue(err)) {
            // 不重试，直接失败
            reject(rejections)
          } else if (polling) {
            console.log('retires')

            delay(interval).then(poll) // 重试
          }
        })
    }
    // 第一次轮询
    poll()
  })
}
