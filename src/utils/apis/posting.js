import { POST } from '../http'

const Detail = ({ id, uid = '' } = {}) => {
  return POST('/api/communityservice/article/open/getarticledetails', { id, uid })
}
const CommentList = ({ articleid, type, page = 1, size = 5 } = {}) => {
  return POST('/api/communityservice/comment/open/getcommentbyarticleidinfo', { articleid, type, page, size })
}
export {
  Detail, CommentList
}
