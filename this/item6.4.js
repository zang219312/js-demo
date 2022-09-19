var uname = 'window'
function Person (uname) {
  this.uname = uname
  this.foo = function () {
    console.log(this.uname)
    return function () {
      console.log(this.uname)
    }
  }
}
var person1 = new Person('person1')
var person2 = new Person('person2')

person1.foo.call(person2)()
person1.foo().call(person2)

// person2
// window

// person1
// person2
