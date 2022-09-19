function foo() {
  console.log(this.a)
};
var obj = { a: 1, foo };
var a = 2;
var foo2 = obj.foo;
var obj2 = { a: 3, foo2: obj.foo }

obj.foo();
foo2();
obj2.foo2();

// 1
// 2
// 3

// ? obj.foo()中的this指向调用者obj
// ? foo2()的调用者是window
// ? obj2.foo()的调用者是foo2
