var name = 'window'
var obj1 = {
  name: 'obj1',
  foo: function () {
    console.log(this.name)
  }
}

var obj2 = {
  name: 'obj2',
  foo: () => {
    console.log(this.name)
  }
}

obj1.foo()
obj2.foo()

// obj1
// window
