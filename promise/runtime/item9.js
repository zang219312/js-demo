async function async1() {
  /*try {
    await Promise.reject('error!!!')
  } catch (e) {
    console.log(e)
  }*/
  // 等价于
  await Promise.reject('error!!!').catch(err => console.log(err))
  console.log('async1');
  return Promise.resolve('async1 success')
}

async1().then(res => console.log(res))
console.log('script start')

// script start
// error!!!
// async1
// async1 success
