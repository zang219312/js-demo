function foo() {
  console.log(this.a);
}

var a = 2;
(function () {
  "use strict";
  foo();
})();

// 2

// * 开启严格模式会使得"use strict"以下代码的this为undefined，也就是这里的立即执行函数中的this是undefined。
// * 但是调用foo()函数的依然是window，所以foo()中的this依旧是window，所以会打印出2
// ! 如果你是使用this.foo()调用的话，就会报错了,因为现在立即执行函数中的this是undefined
// ! 将"use strict"放到foo()函数里面，也会报错。
