const ua = navigator.userAgent
const ua2 = ua.toLowerCase()
window.ENV = {
    mobile: !!ua.match(/AppleWebKit.*Mobile.*/) || !!ua.match(/AppleWebKit/),

    ios: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    android: ua.indexOf('Android') > -1,

    eyee: ua2.indexOf('platform/app') !== -1,

    wx: /micromessenger/.test(ua2),
    qq: /(iPad|iPhone|iPod).*? (IPad)?QQ\/([\d\.]+)/.test(ua2) || /\bV1_AND_SQI?_([\d\.]+)(.*? QQ\/([\d\.]+))?/.test(ua2), // /qq/.test(ua2),
    weibo: /weibo/.test(ua2),
    alipay: /alipayclient/.test(ua2)
}
console.log('    global env: ', ENV)
