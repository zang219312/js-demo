function foo() {
  console.log(this.a)
}

function doFoo(fn) {
  console.log(this)
  fn()
}

var obj = { a: 1, foo }
var a = 2
doFoo(obj.foo)

// window {}
// 2

// ? obj.foo函数内的this发生了改变指向了window
