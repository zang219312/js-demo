function foo () {
  console.log(this.a)
  return function () {
    console.log(this.a)
  }
}
var obj = { a: 1 }
var a = 2

foo()
foo.bind(obj)
foo().bind(obj)

// 2
// 2

// ? foo.bind(obj) 不会执行，它返回的是一个新函数。
