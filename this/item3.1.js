function foo () {
  console.log(this.a)
};
var obj = { a: 1, foo };
var a = 2;
var foo2 = obj.foo;

obj.foo();
foo2();

// 1
// 2

// ? foo2指向的是obj.foo函数但是调用foo2的是window
