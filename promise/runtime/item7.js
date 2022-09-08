async function testSomething() {
  console.log("执行testSomething");
  return "testSomething";
}

async function testAsync() {
  console.log("执行testAsync");
  return Promise.resolve("hello async");
}

async function test() {
  console.log("test start...");
  const v1 = await testSomething();
  console.log(v1); // 第一轮微任务1
  const v2 = await testAsync();
  console.log(v2); // 第二轮微任务1
  console.log(v1, v2);
}

test();

const promise = new Promise(resolve => {
  console.log("promise start...");
  resolve("promise");
});
promise.then(val => console.log(val));  // 第一轮微任务2

console.log("test end...");
// test start...
// 执行testSomething
// promise start...
// test end...
// testSomething
// 执行testAsync
// promise
// hello async
// 执行testAsync , hello async
