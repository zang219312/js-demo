var obj1 = {
  a: 1
}
var obj2 = {
  a: 2,
  foo1: function () {
    console.log(this.a)
  },
  foo2: function () {
    function inner() {
      console.log(this)
      console.log(this.a)
    }

    inner()
    inner.call(obj1)
  }
}
var a = 3
obj2.foo1()
obj2.foo2()

// 2
// window{}
// 3

// {a:1}
// 1
