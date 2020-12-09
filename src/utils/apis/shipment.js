import { POST } from '../http'

const checkShipment = (params = {}) => {
    return POST('/api/stockservice/product/open/app/multi/check/product', params)
}
// 确认求货(批量和手动)
const addShipment = (params = {}) => {
    return POST('/api/goodservice/goods/open/wap/product/all/add', params)
}
// 批量上传
const uploadProduct = (params = {}) => {
    return POST('/api/stockservice/product/open/excel/multi/check/product', params)
}


export { checkShipment, addShipment, uploadProduct }
