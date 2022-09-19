function foo() {
  console.log(this.a)
}

function doFoo(fn) {
  console.log(this)
  fn()
}

var obj = { a: 1, foo }
var a = 2
var obj2 = { a: 3, doFoo }

obj2.doFoo(obj.foo)

// { a: 3, doFoo :f}
// 2

// ? 如果你把一个函数当成参数传递到另一个函数的时候，也会发生隐式丢失的问题且与包裹着它的函数的this指向无关
// ? 在非严格模式下，会把该函数的this绑定到window上，严格模式下绑定到undefined。
"use strict"

function foo2() {
  console.log(this.a)
}

function doFoo2(fn) {
  console.log(this)
  fn()
}

var obj3 = { a: 1, foo2 }
var a2 = 2
var obj4 = { a: 3, doFoo2 }

obj4.doFoo2(obj3.foo2)

// { a: 3, doFoo2：f }
//   Uncaught TypeError:Cannot read properties of undefined (reading 'a')
