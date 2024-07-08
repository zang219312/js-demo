/**
 * 1.可以指定 this
 * 2.返回一个函数
 * 3.可以传入参数
 * 4.柯里化
 */

const toStr = Function.prototype.call.bind(Object.prototype.toString)

console.log(toStr([1, 2, 3]))

