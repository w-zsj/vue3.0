/* global wx */
import { GET } from '../http'

/**
 * 获取微信分享配置参数
 * @param {String} url 分享地址
 */
const WxShareHelp = url => {
    return GET('/api/Imp/WxShareHelp', url)
}

var configed = false
var memberData = {}
const jsApiList = [
    'checkJsApi',
    // 'chooseWXPay',
    'onMenuShareTimeline',
    'onMenuShareAppMessage',
    'onMenuShareQQ',
    'onMenuShareQZone'
]

function WxShare(params) {
    if (params && params.link) {
        let currData = memberData[params.link]
        if (currData) {
            params = { ...params, ...currData }
            _setConfig(params)
            _setShare(params)
        } else _reShare(params)
    } else return false
}

function _reShare(params) {
    WxShareHelp({ url: window.location.href.split('#')[0] }).then(res => {
        if (res && res.appid && res.signature) {
            let temp = {
                appId: res.appid,
                timestamp: res.timestamp,
                nonceStr: res.noncestr,
                signature: res.signature
            }
            memberData[params.link] = temp

            params = { ...params, ...temp }
            _setConfig(params)
            _setShare(params)
        }
    }).catch(e => {
        console.error('WxShareHelp error: ', e)
    })
}
function _setConfig(params) {
    if (params && params.appId && params.signature && !configed) {
        // console.log('config params: ', params)
        configed = true
        wx.config({
            debug: false,
            ...params,
            jsApiList,
            success: function () {
                console.log('wx.config success')
            }
        })
    }
}
function _setShare(params) {
    params.success = function () {
        alert('分享成功')
    }
    params.cancel = function () {
        alert('取消分享')
    }
    params.fail = function () {
        alert('分享失败')
    }

    wx.checkJsApi({
        jsApiList,
        success: function (res) {
            // 以键值对的形式返回，可用的api值true，不可用为false
            // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
            // alert('checkJsApi success' + JSON.stringify(res));
            console.log('微信配置成功', res)
        },
        fail: function (res) {
            // alert('checkJsApi fail' + JSON.stringify(res));
            console.log('微信配置失败', res)
        }
    })
    wx.error(function (res) {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        console.error('wx.error', res)
        // _reShare(params)
    })

    wx.ready(function () {
        /* {
          title: '', // 分享标题
          desc: '',
          link: '',
          imgUrl: '', // 分享图标
          trigger: function (res) {
            // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
          },
          success: fn,
          cancel: fn,
          fail: fn
        } */
        // 分享到朋友圈
        wx.onMenuShareTimeline(params)
        // 分享给朋友
        wx.onMenuShareAppMessage(params)
        // 分享到QQ
        wx.onMenuShareQQ(params)
        // 分享到QQ空间
        wx.onMenuShareQZone(params)
    })
}

export { WxShare }
