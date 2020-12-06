import { POST, GET } from '../http'

const buyGoods = (params = {}) => {
    return POST('/api/goodservice/goods/open/gooddetail', params)
}

export { buyGoods }