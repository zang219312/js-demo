function timeout(time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(time)
    }, time)
  })
}

class SuperTask {
  // PA = null
  constructor(parallelCount = 2) {
    this.parallelCount = parallelCount
    this.tasks = []
    this.runningCount = 0
  }

  add(task) {
    return new Promise((resolve, reject) => {
      this.tasks.push({
        task,
        resolve,
        reject
      })
      this._run()
    })
  }

  _run() {
    if (this.tasks.length > 0 && this.runningCount < this.parallelCount) {
      const { task, resolve, reject } = this.tasks.shift()
      this.runningCount++
      /* console.info('task', task)
      console.info('resolve', resolve)
      console.info('reject', reject) */
      // * add()传进来的回调执行后，返回promise A，add返回的promise B也要完成
      // this.PA = task()

      task()
        .then(resolve, reject)
        .finally(() => {
          this.runningCount--
          this._run()
        })
    }
  }
}

const superTask = new SuperTask()
let PB = null
function addTask(time, name) {
  // PB = superTask.add(() => timeout(time))

  superTask
    .add(() => timeout(time))
    .then(res => {
      console.log(res + 'ms后', '任务' + name + '完成')
    })
    .catch(err => {
      console.log(err)
    })
}

addTask(10000, '1')
addTask(5000, '2')
addTask(3000, '3')
addTask(4000, '4')
addTask(5000, '5')

/* addTask(1000, '1')
addTask(1000, '2')
addTask(1000, '3')
addTask(1000, '4')
addTask(1000, '5') */
