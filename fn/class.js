class A {
  constructor() {
    this.nameA = 'a'
  }

  validateA() {
    console.log('A')
  }
}

class B extends A {
  constructor() {
    super()
    this.nameB = 'b'
  }

  validateB() {
    console.log('B')
  }
}

class C extends B {
  constructor() {
    super()
    this.nameC = 'c'
  }

  validateC() {
    console.log('C')
  }
}

const c = new C
const members = findMembers(c, 'name', 'validate')
// ? 你需要编写一个findMembers函数，传入属性名的前缀name，和方法的前缀名validate；查找全部的以name和validate开头的属性和方法名称
// 返回结果:nameA、nameB、nameC和validateA、validateB、validateC。
function findMembers(instance, ...args) {

  const getProperty = (new_obj) => {
    console.log('start', new_obj)
    if (new_obj.__proto__ === null) { //说明该对象已经是最顶层的对象
      return [];
    }

    const properties = Object.getOwnPropertyNames(new_obj);
    let arr = [];

    args.forEach((v) => {
      const newValue = properties.filter((property) => property.startsWith(v))
      if (newValue.length > 0) {
        arr = arr.concat(newValue);
      }
    })
    return [...arr, ...getProperty(new_obj.__proto__)];
  }
  return getProperty(instance)
}

console.log(members)
