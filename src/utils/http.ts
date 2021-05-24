import axios from 'axios'
import { Toast } from 'vant';
// import Bus from './bus'
const version = process.env.VUE_APP_VERSION

// 请求实例
const http = axios.create({
    baseURL: process.env.VUE_APP_DOMAIN,
    timeout: 8000
})
// 请求拦截器
http.interceptors.request.use((conf: any) => {
    //   Bus.$emit('Loading', true)
    if (conf?.loading) {
        Toast.loading({
            message: '加载中...',
            forbidClick: true,
        });
    }
    conf.headers = { ...conf.headers, 'Content-Type': 'application/json', Authorization: '', version }
    return conf
}, err => {
    console.log('--->request error', err)
    Toast.clear()
    return Promise.reject(err)
})

/**
 * 响应结果异常处理
 * @param {Object} e 异常响应结果的响应体
 */
const responseReject = (e: any) => {
    e = e.response || e
    let { data, status } = e
    let res = { code: 0, msg: '网络异常' }
    if (status) {
        data = data || {}
        res.code = status === 200 ? (data.code || -1) : status
        res.msg = data.msg || data.message
    }

    Toast.clear()
    return Promise.reject(res)
}

// 响应结果拦截器
http.interceptors.response.use(res => {
    // console.log('-->response', res)
    if (res.status === 200) {
        if (res.data && res.data.code === 1511200) {
            Toast.clear()
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

/**
 * HttpGet请求
 * @param {String} url 请求地址
 * @param {Object?} params 请求参数
 */
const GET = (url: string, params = {}) => {
    let config: any = { params }
    config.baseURL = url
    return http.get(url, config)
}

/**
 * HttpPost请求
 * @param {String} url 请求地址
 * @param {Object?} params 请求参数
 */
const POST = (url: string, params = {}, loading = 1) => {
    let config: any = { loading }
    config.baseURL = url
    return http.post(url, params, config)
}

export { GET, POST }
