var uname = 'window'

function Person(uname) {
  this.uname = uname
  this.foo = function () {
    console.log(this.uname)
    return function () {
      console.log(this.uname)
    }
  }
}

var person2 = {
  uname: 'person2',
  foo: function () {
    console.log(this.uname)
    return function () {
      console.log(this.uname)
    }
  }
}

var person1 = new Person('person1')
person1.foo()()
person2.foo()()

// person1 
// window

// person2
// window
