// 故意使用 var，使length挂载到全局window上
var length = 'aaa'

function fn() {
  console.log('len', this.length)
}

const person = {
  length: 2,
  say(cb) {
    cb()
    // console.log(typeof arguments) object
    /**
     * 等价于 arguments.0() or arguments = {
     *   0:cb,
     *   1:1
     *   2:2
     * }
     * arguments[0]() 就是 cb()，但是this指向 arguments
     */
    arguments[0]()
  }
}
person.say(fn, 1, 2) // => 1 3

