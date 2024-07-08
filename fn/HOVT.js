// 提取图片主色调
const img = new Image()
img.src = './test/变量提升.png'
img.setAttribute('width', 100)
img.setAttribute('height', 100)
let color = ''
img.onload = () => {
  const canvas = new OffscreenCanvas(1, 1)
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, 1, 1)
  const { data } = ctx.getImageData(0, 0, 1, 1)
  console.log(`rgba(${data.join(',')})`)
  color = `rgba(${data.join(',')})`

  const div = document.getElementsByClassName('HOVT')[0]
  console.log(div)
  div.appendChild(img)
  const p = document.createElement("p");
  p.innerHTML="测试数据";
  p.style.backgroundColor = color

  div.appendChild(p)
}


