### 模拟实现：

当代码 ```new Foo(...)``` 执行时，会发生以下事情:

1. 一个继承自 ```Foo.prototype```  的新对象被创建。
2. 使用指定参数调用构造函数 ```Foo```，并将 ```this```绑定到新创建的对象。```new Foo```等同于 ```new Foo()```,也就是没有指定参数列表，```Foo```不带任何参数调用的情况。
3. 由构造函数返回的对象就是```new```表达式的结果。如果构造函数没有显示的返回一个对象，则使用步骤1创建的对象。

#### 模拟实现第一步：

new 是关键词，不可以直接覆盖。这里使用 create 来模拟实现 new 的效果。
```new```返回一个新对象，通过 ```obj.__proto__ = Con.prototype ```继承构造函数的原型，同时通过 ```Con.apply(obj,arguments)```
调用父构造函数实现继承获取构造函数上的属性

```   
function create() {
  // 创建一个空的对象
  var obj = new Object(),
  // 获得构造函数，arguments中去除第一个参数
  Con = [].shift.call(arguments);
  // 链接到原型，obj 可以访问到构造函数原型中的属性
  obj.__proto__ = Con.prototype;
  // 绑定 this 实现继承，obj 可以访问到构造函数中的属性
  Con.apply(obj, arguments);
  // 返回对象
  return obj;
};
```

#### 模拟实现第二步：

构造函数返回值有如下三种情况：

1. 返回一个对象
   - 实例 ```car``` 中只能访问到<b>返回对象中的属性</b>

2. 没有 ```return```，即返回 ```undefined```
   - 实例 ```car``` 中只能访问到<b>构造函数中的属性</b>

3. 返回 ```undefined``` 以外的基本类型: `return '12343'`
   - 相当于没有返回值

需要判断下返回的值是不是一个对象，如果是对象则返回这个对象，不然返回新创建的 obj对象。
```
function create() {
	// 1、获得构造函数，同时删除 arguments 中第一个参数
    Con = [].shift.call(arguments);
	// 2、创建一个空的对象并链接到原型，obj 可以访问构造函数原型中的属性
    var obj = Object.create(Con.prototype);
	// 3、绑定 this 实现继承，obj 可以访问到构造函数中的属性
    var ret = Con.apply(obj, arguments);
	// 4、优先返回构造函数返回的对象
	return ret instanceof Object ? ret : obj;
}
```
