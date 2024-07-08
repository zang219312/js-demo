let a = 10
const b = 20

function foo () {
  console.log(this.a)
  console.log(this.b)
}
foo();
console.log(window.a)
// ? var改成了let 或者 const，变量是不会被绑定到window上的
// undefined
// undefined
// undefined
