// * new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例
function Car(color, name) {
  this.color = color;
  // 1.返回一个对象
  // return { name }

  //  3.返回undefined 以外的基本类型
  // return 'str'
}

Car.prototype.start = function () {
  console.log(this.color + " car start");
}

const car = new Car("black");
console.log('car', car)
console.log('color', car.color); // 访问构造函数里的属性  // black
car.start(); // 访问原型里的属性 // black car start
// ? new创建的实例特性
// * 1.访问到构造函数里的属性
// * 2.访问到原型里的属性

// 第一版
function create() {
  const obj = new Object()
  //!  arguments是类数组不能直接调用数组的方法
  // => Array.prototype.shift.call(arguments)
  // 获得构造函数，去除并得到arguments中第一个参数
  const Con = [].shift.call(arguments)
  obj.__proto__ = Con.prototype
  // 绑定 this 实现继承，obj 可以访问到构造函数中的属性
  // 此时obj是个空对象，调用构造函数this指向obj
  Con.apply(obj, arguments)
  return obj
}

const newCar = create(Car, 'red')

console.log('newCar', newCar)
console.log('new color', newCar.color)
newCar.start()

function create2() {
  const Con = [].shift.call(arguments)
  const obj = Object.create(Con.prototype)
  // ret 是Car返回的对象
  const ret = Con.apply(obj, arguments)
  return ret instanceof Object ? ret : obj
}

function Car2(color, name) {
  this.color = color;
  // 1.返回一个对象
  return { name }

  //  3.返回undefined 以外的基本类型
  // return 'str'
}

const Cte = create2(Car2, 'pink', '孙悟空')
console.log(Cte)
