async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end"); // 第一轮的微任务1
}

async function async2() {
  console.log("async2");
}

console.log("script start");

setTimeout(function () {
  console.log("setTimeout");
}, 0); // 第二轮宏任务

async1();

new Promise(function (resolve) {
  console.log("promise1");
  resolve();
}).then(function () {
  console.log("promise2"); // 第一轮的微任务2
});
console.log('script end')

// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout
