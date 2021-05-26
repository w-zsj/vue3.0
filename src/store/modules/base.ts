
import { getMenus } from '@/api/base'
import baseRouter from '@/router/initRouters'

const BasicLayout = () => import('@/Layout/BasicLayout.vue');
const BlankLayout = () => import('@/Layout/BlankLayout.vue');
const Home = () => import('@/views/home.vue');
const loadView = (view: string) => {
    // 路由懒加载
    return () => import(`../../views/${view}.vue`)
}
// 定义基本属性
const state = {
    addRoutes: [],
    routes: [],
    staticRoutes: [],
    breadCrumb: []
}
// getters 只会依赖 state 中的成员去更新
const getters = {
    // 尖头函数
    addRoutes: (state: any) => state.addRoutes,
    routes: (state: any) => state.routes,
    staticRoutes: (state: any) => state.staticRoutes,
    breadCrumb: (state: any) => state.breadCrumb,
}
const actions = {
    async getMenuList({ commit }: any) {
        let data: any = await getMenus()
        if (data?.length) {
            const routers = filterAsyncRouter(data);
            routers?.length && commit('setRouters', routers)
        }
        // 存储所有按钮权限码
        let setPermissions = ['home:search', 'home:btn']
        localStorage.setItem('permissions', setPermissions.join(','))
    },
    BreadCrumbData({ commit }: any, payload: any) {
        commit('setBreadCrumb', payload.crumb)
    }
}
// 遍历后台传来的路由字符串，转换为组件对象,必须要有组件
function filterAsyncRouter(asyncRouterMap: any) {
    return asyncRouterMap.filter((route: any) => {
        // 判断是否有组件名称。
        if (route.component) {
            if (route.component === 'BasicLayout') {
                route.component = BasicLayout
            } else if (route.component === 'BlankLayout') {
                route.component = BlankLayout
            } else {
                route.component = loadView(route.component)
            }
        } else {
            return false;
        }
        if (route?.childlist?.length > 0) {
            route.children = filterAsyncRouter(route.childlist)
            delete route.childlist;
        }
        return true
    })
}

// 修改状态
const mutations = {
    setRouters(state: any, payload: any) {
        state.addRoutes = payload
        state.staticRoutes = [...baseRouter, ...payload]

    },
    setBreadCrumb(state: any, payload: any) {
        state.breadCrumb = payload
    }
}
// 使用VUEx 存储
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}