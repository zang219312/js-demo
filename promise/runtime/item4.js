async function async1() {
  console.log('async1 start');
  await new Promise(resolve => {
    console.log('promise1')
    resolve('promise1 resolve')
  }).then(res => console.log(1, res))
  console.log('async1 success');
  return 'async1 end'
}

console.log('script start')
async1().then(res => console.log(2, res))
console.log('script end')

// script start
// async1 start
// promise1
// script end
// promise1 resolve
// async1 success
// async1 end

// Promise有了返回值了，因此await后面的内容将会被执行
