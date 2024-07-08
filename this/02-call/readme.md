##### 1.Function.prototype.call.bind

    call 本身就是一个函数,可以直接调用 bind，调用之后，call 中的this指向 bind 绑定的值

```javascript
const obj = {}
// bind会返回一个新函数，这个函数与call函数使用方式相同，需要知道bind的源码。
const fn = Function.prototype.call.bind(obj)
fn(this, args)
// 其实Function.prototype.call.bind(obj)就相当于obj.call
// 因为bind绑定了this值，而this值始终指向函数的调用者。所以.bind(obj) === obj.
```

##### 2.Function.prototype.call.bind(Array.prototype.push)
>   根据1可知：```Function.prototype.call.bind(Array.prototype.push)```想当于```Array.prototype.push.call```

```javascript
const arr = []
const push = Function.prototype.call.bind(Array.prototype.push)
push(arr, 'hello')

Array.prototype.push.call(arr, 'world')
console.log(arr) // ['hello', 'world']
```
