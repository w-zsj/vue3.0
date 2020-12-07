import { POST } from '../http'
const Detail = ({ id = '' } = {}) => {
  return POST('/api/communityservice/open/getexposuredetails', { id })
}
export {
  Detail
}
