import { createWebHistory, createRouter } from 'vue-router'
import initRouters from './initRouters'
import store from '../store/index'

import { MenuRouter } from '@/interface'
const history = createWebHistory()
const router = createRouter({
    // 指定路由模式
    history: history,
    // 初始化路由地址
    routes: [...initRouters]
})
//  获取后台返回菜单列表
let rs = () => store.getters['base/addRoutes'] || []
// 添加路由
function setRouter(to: any) {
    if (!(rs()?.length && rs().every((i: MenuRouter<string>) => router.hasRoute(i.name)))) {
        store.dispatch({ type: "base/getMenuList" }).then(() => {
            console.log(`@~~~ 只添加一次路由`)
            rs().forEach((item: any) => router.addRoute(item));
            router.replace(to.fullPath)
        })
    } else {
        // console.warn(`已添加路由`)
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