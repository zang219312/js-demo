function foo() {
  console.log(this.a)
}

var obj = { a: 1, foo }
var a = 2
obj.foo()

// 1

// ? 调用foo的是obj对象，所以打印出来的a是obj的a
