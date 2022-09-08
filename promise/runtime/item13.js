// 使用Promise实现每隔1秒输出1,2,3
/*const arr = [1, 2, 3]
arr.reduce((acr, cur) => {
  return acr.then(() => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(console.log(cur))
      }, 1000)
    })
  })
}, Promise.resolve())*/

// 上面的代码等价于下面的这串

/*Promise.resolve().then(() => {
  console.log('start')
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(console.log(1))
    }, 1000)
  })
}).then(() => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(console.log(2))
    }, 1000)
  })
}).then(() => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(console.log(3))
    }, 1000)
  })
})*/
// ? 每一个.then 都是依赖于上一个 new Promise 何时被 resolve 再执行的，
// ? 第二个.then 需要等```resolve(console.log(1))```执行完毕了再执行
// ? 而```resolve(console.log(1))```需要在第一个定时器(即1s后)触发的时候再执行
// ? 这样就保证了后面的 .then() 要等前一个定时器执行完再执行，也就是隔 1s 输出

// * 扩展：1s后按顺序同时打印
/*const arr2 = [7, 8, 9]
arr2.reduce((acr, cur) => {
  return acr.then(new Promise(resolve => {
    setTimeout(() => {
      resolve(console.log(cur))
    }, 1000)
  }))
}, Promise.resolve())*/

Promise.resolve().then(new Promise(resolve => {
  setTimeout(() => {
    resolve(console.log(1))
  }, 1000)
})).then(new Promise(resolve => {
  setTimeout(() => {
    resolve(console.log(2))
  }, 1000)
})).then(new Promise(resolve => {
  setTimeout(() => {
    resolve(console.log(3))
  }, 1000)
}))
// ! 先打印`我不关心结果`，由于透传，p.then回调的值就是1
/*const p = Promise.resolve(1).then(console.log('我不关心结果'))
console.log('a',p)
p.then((res) => console.log('b',res))*/

// ! p.then()里面的参数如果不是函数的话，会发生透传
// ? 就算发生了透传，p.then()中的代码依旧也是会执行的。
/* * 代码块1
  .then(new Promise(resolve => {
    setTimeout(() => {
      resolve(console.log(1))
    }, 1000)
  }))
*/
// * 代码块1就相当于执行了一段同步代码
/*
  new Promise(resolve => {
    setTimeout(() => {
      resolve(console.log(1))
    }, 1000)
  }
*/
/**
 * * 这段同步代码向延迟队列中push一个1s后执行的定时器任务
 * * 在 push 完定时器之后马上进入第2️⃣个 .then（因为第1️⃣个.then是透传就不用等待执行结果了）
 * * 第2️⃣个 .then 也是透传,继续 push定时器,再执行第3️⃣个 .then
 * * 3个.then 执行完成，延迟队列中有三个定时器等待执行都是，而且延迟时间都是1000ms，所以会同时打印 1、2、3（其实准确来说，不是同时打印的，不过中间相差的时间非常非常短，大可忽略它）
 */
