
import { createWebHistory, createRouter } from 'vue-router'
const history = createWebHistory()

const router = createRouter({
    history, // 路由模式
    routes: [
        { path: '/', name: 'home', component: () => import('@/views/home.vue'), meta: { title: '首页' } },
        { path: '/goods/index', name: 'goods', component: () => import('@/views/goods/index'), meta: { title: '出库详情' } }
    ]
})

export default router
