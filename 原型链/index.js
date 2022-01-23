function Foo() {}
Object.prototype.aa = function () {
  console.log('aa() ')
}
Function.prototype.bb = function () {
  console.log('bb()')
}
const fo = new Foo()
console.log(Object.prototype)
console.log(Function.prototype)
console.log(fo.__proto__ === Foo.prototype) // true
// fo.__proto__ 和 Foo.prototype 都指向一个空的实例对象 ,这个空的实例对象是 Object的 实例
// 即：空的实例对象的隐式原型对象就是它的构造函数的显示原型对象
console.log(
  'Foo的实例',
  fo.__proto__.__proto__ === Object.prototype,
  Foo.prototype.__proto__ === Object.prototype
) // true true
// 这里 Foo 被当成 Function 的实例对象
console.log(Foo.__proto__ === Function.prototype) // true

// Function.prototype 是 Object 的实例，所以它的隐形原型属性指向 Object.prototype
console.log(Function.prototype.__proto__ === Object.prototype) // true
fo.aa()
Foo.aa()
Foo.bb()
