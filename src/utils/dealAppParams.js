import { AppPageType } from './enum'
export default function dealParams(customParams) {
    let callparam = null
    switch (customParams.name) {
        case 'postingDetail':
            callparam = {
                pagetype: AppPageType.postingDetail,
                id: customParams.id
            }
            break
        case 'exposureDetail':
            callparam = {
                pagetype: AppPageType.exposureDetail,
                id: customParams.id
            }
            break
        case 'shipmentDetail': // 求、出货详情
            callparam = {
                pagetype: AppPageType.shipmentDetail,
                id: customParams.sku,
                index: customParams.type
            }
            break
    }
    return callparam
}