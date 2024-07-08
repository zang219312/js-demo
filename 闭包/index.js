// 闭包编程题
// var foo = function (...args) {}

// ? 1.参数不确定
// ? 2.支持链式调用 -> return foo
// ? 3.函数所有参数累加

// 方法1. 在foo上新增变量存储

/* var foo = function (...args) {
  if (!Array.isArray(foo.arr)) {
    foo.arr = []
  }
  foo.arr.push(...args)
  return foo
}
Function.prototype.getValue = () => {
  return foo.arr.reduce((acr, cur) => acr + cur, 0)
} */

// 2. 闭包
var foo = function (...args) {
  /* const fun = function () {
    const arg1 = Array.prototype.slice.call(arguments)
    return foo(...[...args, ...arg1])
  } */
  const fun = (...arg1) => foo(...[...args, ...arg1])
  fun.getValue = () => args.reduce((acr, cur) => acr + cur, 0)

  return fun
}

/* var f1 = foo(1, 2, 3)
f1.getValue() // 6 */

var f2 = foo(1)(2, 3)
f2.getValue() // 6

/* var f3 = foo(1)(2)(3)(4)
f3.getValue() // 10 */
