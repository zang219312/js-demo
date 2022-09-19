function Person(age) {
  this.age = age
  this.foo1 = function () {
    console.log(this.age)
  }
  this.foo2 = function () {
    return function () {
      console.log(this.age)
    }
  }
}

var person1 = new Person(28)
person1.foo1()
person1.foo2()()

// 28
// undefined
