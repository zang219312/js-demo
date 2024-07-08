// 缓存函数计算结果
// * 调用时，如果参数相同，则不再执行该函数，而是直接返回缓存中的结果
function computed(str) {
  console.log('computed ', str)
  return 1000
}

function cached(fn) {
  const cacheObj = Object.create(null)
  return function (str) {
    console.log('__',cacheObj[str])

    if (!cacheObj[str]) {
      cacheObj[str] = fn(str)
    }

    return cacheObj[str]
  }
}

const cacheCom = cached(computed)
console.log('a', cacheCom('a'))
console.log('a', cacheCom('a'))
console.log('b', cacheCom('b'))
