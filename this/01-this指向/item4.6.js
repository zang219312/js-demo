function foo() {
  console.log(this.a)
  return function () {
    console.log(this.a)
  }
}

var obj = { a: 1 }
var a = 2

foo()
foo.call(obj)
foo().call(obj)

// 2
// 1
// 2
// 1
