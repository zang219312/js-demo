function foo(item) {
  console.log(item, this.a)
}

var obj = {
  a: 'obj'
}
var a = 'window'
var arr = [1, 2, 3]

// arr.forEach(foo, obj)
// arr.map(foo, obj)
let res = arr.filter(function (i) {
  console.log(i, this.a)
  return i > 2
}, obj)
console.log(res)
// 1 obj
// 2 obj
// 3 obj

// res => [3]
