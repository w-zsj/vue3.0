import { RouteRecordRaw } from 'vue-router'
// 基础路由
const baseRouter: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/login.vue'),
        meta: { title: '登录' }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('../views/404.vue')
    }
]
export default baseRouter