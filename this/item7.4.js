var name = 'window'
function Person (name) {
  this.name = name
  this.foo1 = function () {
    console.log(this.name)
  }
  // * 它的外层作用域是构造函数Person，并且使用了new来生成了对象person1,所以此时this的指向是为person1
  this.foo2 = () => {
    console.log(this.name)
  }
}
var person2 = {
  name: 'person2',
  foo2: () => {
    console.log(this.name)
  }
}
var person1 = new Person('person1')
person1.foo1()
person1.foo2()
person2.foo2()

// person1
// person1
// window
