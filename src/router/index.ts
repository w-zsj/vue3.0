import { createWebHistory, createRouter } from 'vue-router'
import { defineAsyncComponent } from 'vue'
const history = createWebHistory()
const router = createRouter({
    // 指定路由模式
    history: history,
    // 路由地址
    routes: [
        { path: '/', name: 'home', component: defineAsyncComponent(() => import('../views/home.vue')), meta: { title: '首页' } },

        // ! ! ! 在此行上面增加路由
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})
router.beforeEach((to, from) => {
    // console.log('to', to, 'from', from)
    if (to.meta && to.meta.title) {
        (window as any).document.title = to.meta.title
    }
})
export default router