function foo () {
  console.log(this.a)
}
var obj = { a: 1 }
var a = 2

foo()
foo.call(obj)
foo.apply(obj)
foo.bind(obj)

// 2
// 1
// 1

