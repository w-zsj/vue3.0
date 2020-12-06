
import { createWebHistory, createRouter } from 'vue-router'
const history = createWebHistory()

const router = createRouter({
    history, // 路由模式
    routes: [
        { path: '/', name: 'home', component: () => import('@/views/home.vue'), meta: { title: '首页' } }
    ]
})

export default router
