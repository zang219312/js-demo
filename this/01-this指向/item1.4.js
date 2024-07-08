var a = 1
function foo () {
  var a = 2
  console.log(this)
  console.log(this.a)
  console.log(a)
}

foo()

// window{}
// 1
// 2
