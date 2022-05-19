import axios from "axios";
const { DEV, VITE_API_URL } = (import.meta as any).env;

import { ElLoading } from "element-plus";
let loadingInstance: any;
// 请求实例
const http = axios.create({
  baseURL: VITE_API_URL,
  timeout: 8000,
});
// 请求拦截器
http.interceptors.request.use(
  (conf: any) => {
    if (conf?.loading) {
      loadingInstance = ElLoading.service({ text: "加载中..." });
    }
    conf.headers = {
      ...conf.headers,
      "Content-Type": "application/json",
      Authorization: "",
    };
    return conf;
  },
  (err) => {
    console.log("--->request error", err);
    loadingInstance && loadingInstance.close();
    return Promise.reject(err);
  }
);

/**
 * 响应结果异常处理
 * @param {Object} e 异常响应结果的响应体
 */
const responseReject = (e: any) => {
  e = e.response || e;
  let { data, status } = e;
  let res = { code: 0, msg: "网络异常" };
  if (status) {
    data = data || {};
    res.code = status === 200 ? data.code || -1 : status;
    res.msg = data.msg || data.message;
  }

  loadingInstance && loadingInstance.close();
  return Promise.reject(res);
};

// 响应结果拦截器
http.interceptors.response.use(
  (res) => {
    if (res.status === 200) {
      loadingInstance && loadingInstance.close();
      let data = res.data;
      return data;
    }
    return responseReject(res);
  },
  (err) => responseReject(err)
);

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
  let config: any = { params };
  return http.get(url, config);
};

/**
 * HttpPost请求
 * @param {String} url 请求地址
 * @param {Object?} params 请求参数
 */
const POST = (url: string, params = {}, loading = 1) => {
  let config: any = { loading };
  return http.post(url, params, config);
};

export { GET, POST };
