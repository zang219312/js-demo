"use strict";
var a = 10;

function foo() {
  console.log('this1', this)
  console.log(window.a)
  console.log(this.a)
}

console.log(window.foo)
console.log('this2', this)
foo();

// ? 开启了严格模式，只是说使得函数内的this指向undefined，它并不会改变全局中this的指向

// func { }
// this2 window{}
// this1 undefined
// 10
// ! uncaught typeError
