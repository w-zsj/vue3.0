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
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})

// 判断是否已经 添加过路由
function hasNecessaryRoute(to: any) {
    let getroutes = router.getRoutes(), flag = false
    flag = getroutes.some(i => (i.path == to.fullPath))
    return flag

}
// 添加路由
function setRouter(router: any) {
    store.dispatch({ type: "base/getMenuList" }).then(() => {
        let routers = store.getters['base/addRoutes']
        if (routers?.length) routers.forEach((item: any) => router.addRoute(item));
        return router
    })
}

router.beforeEach((to: any) => {
    if (!hasNecessaryRoute(to)) {
        setRouter(router)
        return to.fullPath
    }
    if (to.meta && to.meta.title) {
        (window as any).document.title = to.meta.title
    }
})

export default router