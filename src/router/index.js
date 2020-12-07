
import { createWebHistory, createRouter } from 'vue-router'
const history = createWebHistory()

const router = createRouter({
    history, // 路由模式
    routes: [
        { path: '/', name: 'home', component: () => import('@/views/home.vue'), meta: { title: '首页' } },
        { path: '/calculator/index', name: 'CalculatorIndex', component: () => import('@/views/calculator/index'), meta: { title: '计算器' } }, // 计算器
        { path: '/goods/index', name: 'goods', component: () => import('@/views/goods/index'), meta: { title: '出库详情' } },
        { path: '/about/agreement', name: 'useragreement', component: () => import('@/views/about/userAgreement'), meta: { title: '用户协议' } }, // 隐私政策
        { path: '/about/privacy', name: 'PrivacyPolicy', component: () => import('@/views/about/privacyPolicy'), meta: { title: '隐私政策' } }, // 用户协议
    ]
})

export default router
