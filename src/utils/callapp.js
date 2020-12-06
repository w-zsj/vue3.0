const appStore = 'https://apps.apple.com/cn/app/id1542947022' // https://sj.qq.com/myapp/detail.htm?apkName=com.etechs.eyee
const loadUrl = '' // https://a.app.qq.com/o/simple.jsp?pkgname=com.etechs.eyee
const schemeUrl = 'sneakerburgerbusiness://'
const redirectLink = 'sneakerburgerbusiness/h5?param='

const tryDelay = 400
const showHintDelay = 700
const skipLoadDelay = 1300

var skipLoadTimer = null
function clearSkipLoad() {
    if (skipLoadTimer) clearTimeout(skipLoadTimer)
}
document.onvisibilitychange = document.webkitvisibilitychange = function () {
    let tag = document.hidden || document.webkitHidden
    if (tag) clearSkipLoad()
}
window.onpagehide = function () { clearSkipLoad() }

function tryCall(url, callback = () => { }) {
    var isCalled = false
    var frame = null

    setTimeout(function () {
        isCalled = true
        frame = document.createElement('iframe')
        frame.hidden = true
        frame.style.display = 'none'
        frame.src = url
        document.body.append(frame)
        if (ENV.ios) window.location.href = url // window.open(url, '_new')
    }, tryDelay)

    setTimeout(() => {
        callback(isCalled)
        if (frame) {
            document.body.removeChild(frame)
            frame = null
        }
    }, showHintDelay)
}

var settedClick = false
/**
 * 唤起APP或下载App
 * @param {Boolean} istry 是否是尝试唤起
 * @param {Object} callparam 唤起页面的参数
 * @param {Boolean} hint 是否必须显示蒙层提示
 * @param {Element} $hint 提示使用浏览器打开的DOM元素
 */
function CallApp(callparam, hint = true, $hint) {
    let url = schemeUrl // + redirectLink
    if (callparam && !isNaN(callparam.pagetype)) {
        url = url + redirectLink + JSON.stringify(callparam)
    } else if (!ENV.ios) {
        url = url + redirectLink
    }
    if (hint && $hint && !settedClick) {
        settedClick = true
        $hint.onclick = function () {
            $hint.style.display = 'none'
        }
    }

    const calledBack = function (isCalled) {
        let inHint = ENV.wx || ENV.qq || ENV.weibo
        if (ENV.mobile && inHint && hint) {
            $hint.style.display = 'block'
        }
        if (!inHint) {
            skipLoadTimer = setTimeout(() => {
                // ENV.ios ? window.open(appStore, '_new') : window.location.href = loadUrl
                window.location.href = ENV.ios ? appStore : loadUrl
            }, skipLoadDelay)
        }
    }

    if (ENV.wx) {
        // wxJsBridgeReady(function () {
        // 微信内唤起APP的处理, 需要有 js-sdk 的 launchApplication 授权
        // if (window.WeixinJSBridge && !compareVersion(getWeixinVersion(), '6.5.6', 'lt') && iscall) {
        //   WeixinJSBridge.invoke('launchApplication', {
        //     'schemeUrl': url
        //   }, function (res) { console.log('launchApplication res', res) })
        //   return
        // }
        tryCall(url, calledBack)
        // })
    } else {
        tryCall(url, calledBack)
    }
}

export default CallApp
