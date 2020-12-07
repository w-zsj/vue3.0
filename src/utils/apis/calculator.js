import { POST, GET } from '../http'

// 出价计算器
const CalculatePrice = (params = {}) => {
  return GET('api/accountservice/open/wx/calc/fee', params)
}
// 计算器-平台
const PlatformList = (params = {}) => {
  return GET('api/accountservice/open/wx/platform/up', params, 0)
}
// 比价-获取多个尺码最低价
const GetSizeLowprice = (params = {}) => {
  return GET('api/saleservice/open/compare/getcomparepricesizeslist', params, 0)
}
export {
  CalculatePrice, PlatformList, GetSizeLowprice
}
