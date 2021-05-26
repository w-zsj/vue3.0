import { createWebHistory, createRouter } from 'vue-router'
import initRouters from './initRouters'
import store from '../store/index'
const history = createWebHistory()
const router = createRouter({
    // 指定路由模式
    history: history,
    // 路由地址
    routes: [
        ...initRouters
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) return savedPosition
        else return { top: 0 }
    }
})
// 添加路由
function setRouter(router: any, to: any) {
    store.dispatch({ type: "base/getMenuList" }).then(() => {
        let routers = store.getters['base/addRoutes']
        if (routers?.length) routers.forEach((item: any) => {
            router.addRoute(item)
        });

        router.push(to.fullPath)
    })
}

// 在导航守卫中添加路由
router.beforeEach((to: any) => {
    // console.log(`to`, to)
    // 1、 判断是否登录
    // 2、已登录
    // 判断是否已经 添加过路由
    if (!router.hasRoute("Home")) setRouter(router, to)

    // 设置页面标题
    if (to.meta && to.meta.title) {
        (window as any).document.title = to.meta.title
    }
})

export default router