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
    ]
})
// 添加路由
let routers = store.getters['base/addRoutes'] || []
function setRouter(to: any) {
    if (!(routers?.length && routers.every((i: any) => router.hasRoute(i.name)))) {
        store.dispatch({ type: "base/getMenuList" }).then(() => {
            routers = store.getters['base/addRoutes']
            console.log(`@~~~ 只添加一次路由`)
            routers.forEach((item: any) => router.addRoute(item));
            router.replace(to.fullPath)
        })
    } else {
        console.warn(`已添加路由`)
    }

}
// 在导航守卫中添加路由
router.beforeEach(to => {
    // 1、 判断是否登录
    // 2、已登录
    // 判断是否已经 添加过路由
    setRouter(to)
})

export default router