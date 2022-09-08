const first = () => (new Promise((resolve, reject) => {
  console.log(3);
  let p = new Promise((resolve, reject) => {
    console.log(7);
    setTimeout(() => { // 第二伦宏任务1
      console.log(5);
      resolve(6);
      console.log(p)
    }, 0)
    resolve(1);
  });
  resolve(2);
  p.then((arg) => {  // 第一轮微任务1
    console.log(arg);
  });
}));

first().then((arg) => { // 第一轮微任务 2
  console.log(arg);
});
console.log(4);

// 3
// 7
// 4
// 1
// 2
// 5
// Promise<fulfilled,1>
