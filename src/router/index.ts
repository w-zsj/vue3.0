import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'
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

// 判断是否已经 添加过路由
function hasNecessaryRoute(to: any) {
    let getroutes = router.getRoutes(), flag = false
    // 判断404 页面 router.hasRoute('Home')路由是否已经添加 防止 循环添加
    let judPathKey = getroutes.findIndex(i => i.path == to.path)
    if (router.hasRoute('Home') && judPathKey == -1) flag = true
    // flag=true  进入 404 页面

    return flag || router.hasRoute('Home')

    // flag = getroutes.some(i => (i.path == to.fullPath))
}
// 添加路由
function setRouter(router: any) {
    store.dispatch({ type: "base/getMenuList" }).then((r) => {
        let routers = store.getters['base/addRoutes']
        if (routers?.length) routers.forEach((item: any) => {
            router.addRoute(item)
        });
        return router
    })
}

// 在导航守卫中添加路由
router.beforeEach((to: any) => {
    // 1、 判断是否登录
    // 2、已登录
    if (!hasNecessaryRoute(to)) {
        setRouter(router)
        return to.fullPath
    }
    // 设置页面标题
    if (to.meta && to.meta.title) {
        (window as any).document.title = to.meta.title
    }
})

export default router