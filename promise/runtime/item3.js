async function async1() {
  console.log('async1 start');
  await new Promise(resolve => {
    console.log('promise1')
  })
  console.log('async1 success');
  return 'async1 end'
}

console.log('script start')
async1().then(res => console.log(res))
console.log('script end')

// script start
// async1 start
// promise1
// script end

// 分析：
// ? 在async1中await后面的Promise是没有返回值的，也就是它的状态始终是pending状态
// ? await之后的内容是不会执行的，也包括async1后面的 .then
