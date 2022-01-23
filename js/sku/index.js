const sampleType = [
  '咽拭子',
  '鼻拭子',
  '采血管（黄）',
  '粪便管',
  '无菌杯',
  '痰杯',
  '尿杯'
]
const areas = ['杭州', '湖州', '邹城', '安吉', '重庆']
const laboratories = ['杭州同创', '湖州同创', '树懒7号窗口', '精准中心', '生创']

// 笛卡尔积
console.time('a')
/* function CartesianProduct(list) {
  let point = {}
  let result = []
  let pIndex = null
  let tempCount = 0
  let temp = []

  for (let index in list) {
    if (typeof list[index] === 'object') {
      point[index] = { parent: pIndex, count: 0 }
      pIndex = index
    }
  }

  if (pIndex === null) {
    return list
  }
  while (true) {
    let index
    for (index in list) {
      tempCount = point[index].count
      temp.push(list[index][tempCount])
    }

    result.push(temp)
    temp = []

    while (true) {
      if (point[index].count + 1 >= list[index].length) {
        point[index].count = 0
        pIndex = point[index].parent
        if (pIndex === null) {
          return result
        }

        index = pIndex
      } else {
        point[index].count++
        break
      }
    }
  }
} */
// const res = CartesianProduct([areas, laboratories, sampleType])
const res = [areas, laboratories, sampleType].reduce(
  (a, b) => {
    return a.flatMap(x => b.map(y => [...x, y]))
  },
  [[]]
)
console.log(res)
console.timeEnd('a')
