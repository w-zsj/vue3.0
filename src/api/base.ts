import { GET, POST } from '@/utils/http'
export const getMenus = (params?: any) => {
    return GET('http://localhost:3031/posts', params)
}
