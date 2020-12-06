import axios from 'axios'

// 创建axios
const service = axios.create({
    baseURL: process.env.VUE_APP_DOMAIN,
    timeout: 8000
});

// 请求拦截器
service.interceptors.request.use(config => {

    config.headers = { ...config.headers, 'Content-Type': 'application/json', Authorization: '', os: 'h5', deviceid: 'h5' }
    // console.log('->request config', conf)
    return config
}, err => {
    console.log('--->request error', err)

    return Promise.reject(err)
})


/**
 * 响应结果异常处理
 * @param {Object} e 异常响应结果的响应体
 */
const responseReject = e => {
    e = e.response || e
    // console.error('--->response error', { ...e })
    let { data, status, statusText } = e
    let res = { code: 0, msg: '网络异常' }
    if (status) {
        data = data || {}
        res.code = status === 200 ? (data.code || -1) : status
        res.msg = res.code === -1 ? (data.msg + (data.data ? (',' + data.data) : '')) : (data.msg || data.message || statusText || JSON.stringify(e))
        res.msg = res.code === 10721 ? (data.msg + (data.data ? (',' + data.data) : '')) : (data.msg || data.message || statusText || JSON.stringify(e))
    }

    return Promise.reject(res)
}
// 响应结果拦截器
service.interceptors.response.use(res => {
    // console.log('-->response', res)

    if (res.status === 200) {
        if (res.data && res.data.code === 1511200) {
            let data = res.data.data
            return data
        }
    }
    return responseReject(res)
}, err => responseReject(err))

/**
 * 处理请求地址(mock处理)
 * @param {String} url 请求地址
 */
const dealUrl = url => {
    const mockPre = '/mock'
    // 使用mock数据时，需在请求地址前增加前缀 '/mock' 由基础请求处理掉
    let baseURL = ''
    if (!/http/i.test(url) && url.indexOf(mockPre) === 0) {
        url = url.replace(mockPre, '')
        baseURL = process.env.VUE_APP_MOCKDOMAIN || ''
    }
    return { realUrl: url, baseURL }
}

/**
 * HttpGet请求
 * @param {String} url 请求地址
 * @param {Object?} params 请求参数
 */
const GET = (url, params = {}) => {
    let config = { params }
    let { realUrl, baseURL } = dealUrl(url)
    if (baseURL) config.baseURL = baseURL
    return service.get(realUrl, config)
}

/**
 * HttpPost请求
 * @param {String} url 请求地址
 * @param {Object?} params 请求参数
 */
const POST = (url, params = {}) => {
    let config = {}
    let { realUrl, baseURL } = dealUrl(url)
    if (baseURL) config.baseURL = baseURL
    return service(realUrl, params, config)
}

export {
    GET, POST
}