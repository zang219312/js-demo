'use strict'
;(function (w) {
  w.tools = {}

  tools.replaceNode = function (node) {
    // 1.获取所有符合条件的 a标签
    var tableImg = tools.getElementByAttr('img', 'data-original')
    var classList = ['imgGroupCss_v', 'imgGroupCss_h'] // 单个表，多个表
    var aNodes = tools.getTableAttr(tableImg)

    // document.querySelectorAll('.Css_sac>.imgGroupCss_v a')

    // 2.获取所有的表格链接
    var tableHtml = []
    for (var iterator of aNodes) {
      var url = iterator.getAttribute('href').toString()
      if (url.includes('http')) {
        tableHtml.push(iterator.getAttribute('href'))
      } else {
        tableHtml.push('https:' + iterator.getAttribute('href'))
      }
    }

    var connector = (function () {
      var connector = null
      if (window.XMLHttpRequest) {
        connector = new XMLHttpRequest()
      } else if (window.ActiveXObject) {
        connector = new ActiveXObject('Microsoft.XMLHTTP')
      }
      return connector
    })()
    // var innerText = document.body.innerText ? 'innerText' : 'textContent'

    var responseMultiArr = [],
      responseSingleArr = []
    var handler = function (response, j) {
      var className = aNodes[j].parentNode.getAttribute('class')
      response = tools.stripscript(response)

      if (className === classList[0]) {
        responseSingleArr.push({ j, response, aNode: aNodes[j] })
        // aNodes[j].parentNode['innerHTML'] = response //+=
        // tools.handleSingle({ j, response, aNode: aNodes[j] })
        var newEl = document.createElement('p')
        newEl.innerHTML = response
        aNodes[j].parentNode.replaceChild(newEl, aNodes[j])
        return
      }

      // 多个表,
      if (className === classList[1]) {
        var obj = { j, response, aNode: aNodes[j] }
        responseMultiArr.push(obj)

        if (j === tableImg.length - 1) {
          tools.handleMulti(responseMultiArr)
        }
      }
    }

    for (var i = 0; i < tableHtml.length; i++) {
      connector.onreadystatechange = (function (callback, i) {
        return function () {
          if (connector.readyState == 4) {
            callback.call(connector, connector.responseText, i)
          }
        }
      })(handler, i)
      connector.open('GET', tableHtml[i], false) //发送到本页面
      connector.send()
    }
  }

  tools.handleMulti = function (response) {
    var len = response.length,
      newArr = []
    // 分割数组
    var idx = 0
    for (var i = 0; i < len; i++) {
      // var j = i == len - 1 ? len - 1 : i + 1
      var j = i + 1

      if (
        response[i].aNode.parentNode ===
        (response[j] && response[j].aNode.parentNode)
      ) {
        newArr[idx] = typeof newArr[idx] === 'undefined' ? [] : newArr[idx]
        newArr[idx].push(response[i])
      } else {
        newArr[idx].push(response[i])
        idx += 1
      }
    }

    var obj = [],
      text = []
    newArr.map((v, k) => {
      obj[k] = tools.getTextNode(v, k, text)
      v[0].aNode.parentNode.innerHTML = obj[k].str
    })
  }

  tools.getTextNode = function (v, k, text) {
    var str = []
    text[k] = []

    v = v.map((val, key) => {
      if (key === 0) {
        var childNodes = val.aNode.parentNode.childNodes
        for (var item of childNodes) {
          if (item.nodeType === 3) {
            text[k].push('<p>' + item.nodeValue + '</p>')
          }
        }
      }
      val.response = (text[k][key] || '') + val.response
      str[key] = val.response
      return val
    })

    v.str = str.join(' ')
    console.log('🚀 ~ file: htmlinsert.js ~ line 123 ~ v', v)

    return v
  }

  tools.stripscript = function (s) {
    // 删除 script
    return s.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  }

  tools.currDevice = function () {
    var u = navigator.userAgent
    var app = navigator.appVersion //appVersion 可返回浏览器的平台和版本信息。该属性是一个只读的字符串。
    var browserLang = (
      navigator.browserLanguage || navigator.language
    ).toLowerCase() // 获取浏览器语言

    return (function () {
      return {
        trident: u.indexOf('Trident') > -1, //IE 内核
        presto: u.indexOf('Presto') > -1, //opera 内核
        webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, // 火狐内核
        isMobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
        ios: !!u.match(/\(i [^;]+;( U;)? CPU.Mac OS X/), //ios 终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android 终端或者 uc 浏览器
        iPhone: u.indexOf('iPhone') > -1, // 是否为 iPhone 或者 QQHD 浏览器
        iPad: u.indexOf('iPad') > -1, // 是否 iPad
        webApp: u.indexOf('Safari') == -1, // 是否 web 应用程序，没有头部和底部
        weixin: u.indexOf('MicroMessenger') > -1, // 是否微信
        qq: u.match(/\sQQ/i) == 'qq' // 是否 QQ
      }
    })()
  }

  tools.getElementByAttr = function (tag, dataAttr) {
    // 获取table图
    var aElements = document.getElementsByTagName(tag)
    var aEle = []
    for (var iterator of aElements) {
      if (iterator.getAttribute(dataAttr) === 'Images/Table_Tmp.jpg') {
        aEle.push(iterator)
      }
    }
    return aEle
  }

  tools.getTableAttr = function (tableImg) {
    var aNodes = []
    for (var iterator of tableImg) {
      aNodes.push(iterator.parentNode)
    }

    return aNodes
  }
})(window)
