import { promisePoller } from './lib/index'

const $start = document.querySelector<HTMLButtonElement>('#start')
const $asyncStop = document.querySelector<HTMLButtonElement>('#stop')
const $fixedCounter =
  document.querySelector<HTMLParagraphElement>('#fixed-counter')
const $linearCounter =
  document.querySelector<HTMLParagraphElement>('#linear-counter')
const $exponentialCounter = document.querySelector<HTMLParagraphElement>(
  '#exponential-counter'
)

let stop = false
let num = 0
const limit = 30
$start.addEventListener('click', () => {
  console.log('start')
  promisePoller({
    interval: 100,
    masterTimeout: 10000,
    progressCallback: (num, err) => {
      console.log('progressCallback', num, err)
    },
    taskFn: async () => {
      console.log('taskFn', num)
      // 异步方法 抛出错误
      if (stop) {
        if (num < 20) {
          throw new Error('request failed')
        }

        throw new Error('CANCEL_TOKEN')
        // 同步方法直接返回false
        return false
      }

      num += 1
    },
    shouldContinue: (err, result) => {
      return num < limit
    }
  })
    .then(res => {
      console.log(res)
      num = 0
    })
    .catch(err => {
      //  报错了停止轮询
      console.log('promisePoller-err:', err.message)
      stop = true
    })
})

$asyncStop.addEventListener('click', () => {
  stop = true
})
