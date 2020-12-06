// #region 时间工具
/**
 * 是否为时间对象
 * @param {Object} datetime 校验对象
 */
const _isDate = datetime => Object.prototype.toString.call(datetime) === '[object Date]'

/**
 * 转时间格式
 * @param {String} datetime 时间格式的字符串
 */
const ToDate = datetime => {
  if (typeof datetime === 'string') {
    let arr = datetime.split(/[- : / T]/)
    if (arr[0].length === 4) arr[1] = arr[1] - 1
    datetime = new Date(...arr)
  }
  if (!_isDate(datetime)) datetime = new Date()
  return datetime
}

/**
 * 时间格式化
 * @param {Object} datetime 要格式化的时间对象或时间格式的字符串
 * @param {String?} format 执行格式化的格式, 默认 长时间格式: 'yyyy-MM-dd HH:mm:ss'
 */
const DateFormat = (datetime, format = 'yyyy-MM-dd HH:mm:ss') => {
  let date = datetime
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  try {
    if (!_isDate(date)) date = ToDate(date)
    let o = {
      'ｍ+': month[date.getMonth()],
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'H+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(format)) format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
    return format
  } catch (e) {
    return datetime
  }
}

/**
 * 时间差值
 * @param {Object?} options source与destination 必须同时有一个有值
 * @param {String?} options.type 差值转换格式, ['d','H','m','s']
 * @param {Object?} options.source 源 时间对象或时间格式的字符串, 默认 当前时间
 * @param {Object?} options.destination 目标 时间对象或时间格式的字符串, 默认 当前时间
 * @returns 返回 null|{s:秒,m:分,H:时,d:天}(若为负值则表示时间指向反了)
 */
const DateDiff = ({ type = 'H', source = new Date(), destination = new Date() } = {}) => {
  let ts = 0
  try {
    if (!_isDate(source)) source = ToDate(source)
    if (!_isDate(destination)) destination = ToDate(destination)
    ts = destination.getTime() - source.getTime() // Math.abs(destination.getTime() - source.getTime());
    // console.log('sTs:%s,dTs:%s,ts:%s', source.getTime(), destination.getTime(), ts);
    let o = {
      s: Math.floor(ts / 1000),
      m: Math.floor(ts / 60000), // 1000*60
      H: Math.floor(ts / 3600000), // 1000*60*60
      d: Math.floor(ts / 86400000) // 1000*60*60*24
    }

    switch (type) {
      case 'H':
      default:
        return { s: o.s % 60, m: o.m % 60, H: o.H, d: 0 }
      case 's':
        return { s: o.s, m: 0, H: 0, d: 0 }
      case 'm':
        return { s: o.s % 60, m: o.m, H: 0, d: 0 }
      case 'd':
        return { s: o.s % 60, m: o.m % 60, H: o.H % 24, d: o.d }
    }
  } catch (e) {
    return null
  }
}

/**
 * 时间差值格式化
 * @param {Object} datetime 与当前时间计算差值的 时间对象或时间格式的字符串
 * @param {Object?} options
 * @param {Number?} options.d 天数限值
 * @param {Object?} options.dShow 超出 天数限值 的显示格式, 默认为空, 使用'd天前'
 */
const DateDiffFormat = (datetime, { d = 1, dShow = '' } = {}) => {
  let diff = DateDiff({ source: datetime })
  let result = ''
  if (diff) {
    if (d >= 1 && diff.H >= d * 24) {
      if (dShow) result = DateFormat(datetime, dShow)
      else result = `${Math.floor(diff.H / 24)}天前`
    } else {
      if (diff.H > 0) result = diff.H + '小时前'
      else {
        if (diff.m > 1) result = diff.m + '分钟前'
        else result = '刚刚'
      }
    }
  }
  return result
}
// #endregion

/**
 * 复制到剪切板
 * @param {String|DOMElement} el 包含要复制内容的input或textare的 选择器字符串或DOM元素
 */
const CopyToClipboard = el => {
  // resolve the element
  el = (typeof el === 'string') ? document.querySelector(el) : el

  el.select()

  // handle iOS as a special case
  if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
    // save current contentEditable/readOnly status
    var editable = el.contentEditable
    var readOnly = el.readOnly

    // convert to editable with readonly to stop iOS keyboard opening
    el.contentEditable = true
    el.readOnly = true

    // create a selectable range
    var range = document.createRange()
    range.selectNodeContents(el)

    // select the range
    var selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange(range)
    el.setSelectionRange(0, 999999)

    // restore contentEditable/readOnly to original state
    el.contentEditable = editable
    el.readOnly = readOnly
  }

  // execute copy command
  document.execCommand('copy')
}

// 直接前往app
const appStore = '' // https://sj.qq.com/myapp/detail.htm?apkName=com.etechs.eyee
const loadUrl = '' // https://a.app.qq.com/o/simple.jsp?pkgname=com.etechs.eyee
const GoApp = el => {
  window.location.href = ENV.ios ? appStore : loadUrl
}

export {
  ToDate, DateFormat, DateDiff, DateDiffFormat,
  CopyToClipboard, GoApp
}
