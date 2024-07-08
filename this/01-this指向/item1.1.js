var a = 10;

function foo() {
  console.log(this.a)
}

foo();
// ? 非严格模式
// 10


