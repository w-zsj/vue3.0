
import { getMenus, testMock } from '@/api/base'
import baseRouter from '@/router/initRouters'

const BasicLayout = () => import('@/Layout/BasicLayout.vue');
const BlankLayout = () => import('@/Layout/BlankLayout.vue');
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
        // getMenus  testMock
        let data: any = await testMock()
        // console.log(`data-->>>`, data)
        if (data?.length) {
            // 存储所有按钮权限码
            let setPermissions = filterAsyncPermissions([...data])
            localStorage.setItem('permissions', setPermissions.join(','))
            // 处理菜单
            const routers = filterAsyncRouter(data);
            routers?.length && commit('setRouters', routers)
        }
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
        // type  1：目录，2：页面，3: 隐藏页面，4：按钮
        // 不需要添加路由管理
        if (route.type === 4) {
            return false;
        }
        // 不需要在左侧菜单栏显示
        if (route.type === 3) route.hidden = true;

        if (route?.childlist?.length > 0) {
            route.children = filterAsyncRouter(route.childlist)
            delete route.childlist;
        }
        return true
    })
}

// 遍历后台传来的路由字符串，转换为组件对象,必须要有组件
function filterAsyncPermissions(asyncRouterMap: any[]) {
    let permissions: any = [];
    const filterPermissions = (route: any) => {
        const { permission = '' } = route;
        if (permission) permissions.push(permission);
        if (route?.childlist?.length > 0) {
            route.childlist.forEach((it: any) => filterPermissions(it));
        }
    }
    asyncRouterMap.forEach(it => filterPermissions(it));
    return permissions;
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