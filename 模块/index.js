const userModule = ((name = 'module') => {
  let id = 1, moduleName = name;
  const sayName = () => {
    console.log('moduleName: %s', moduleName);
  };
  const sayId = () => {
    console.log('id: %s', id);
  };
  const changeName = value => {
    moduleName = value;
  };
  const changePublicAPI = () => {
    publicAPI.sayIdentification = sayId
  };
  const publicAPI = {
    sayIdentification: sayName,
    changeName,
    changePublicAPI
  }
  return publicAPI;
})();
/*userModule.sayIdentification()
userModule.changePublicAPI()
userModule.sayIdentification()*/

// 简易模块依赖管理器
const moduleManage = (() => {
  const modules = {};
  const define = (name, deps, module) => {
    deps = deps.map(item => modules[item])
    modules[name] = module(...deps);
  };
  const exports = (name) => modules[name]
  return { define, exports }
})();

moduleManage.define('a', [], () => {
  const sayNameOfA = name => {
    console.log('name: %s', name)
  }
  return { sayName: sayNameOfA }
})

moduleManage.define('b', ['a'], (a) => {
  const name = 'b'
  const sayNameOfB = () => {
    a.sayName(name)
  }

  return { sayName: sayNameOfB }
})

const b = moduleManage.exports('b')

b.sayName()
