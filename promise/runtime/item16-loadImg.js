function loadImg(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      console.log("一张图片加载完成");
      resolve(img);
    };
    img.onerror = () => {
      reject(new Error('Could not load image at' + url));
    };
    img.src = url;
  });
}

export default loadImg
