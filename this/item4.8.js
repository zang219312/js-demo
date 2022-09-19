function foo () {
  console.log(this.a)
  return function () {
    console.log(this.a)
  }
}
var obj = { a: 1 }
var a = 2

foo.call(obj)()

// 1
// 2

// * foo()函数内的this虽然指定了是为obj，但是调用最后调用匿名函数的却是window
