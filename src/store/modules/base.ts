import { defineAsyncComponent } from 'vue'
import baseRouter from '../../router/initRouters'
// 定义基本属性
const state = {
    addRoutes: [],
    routes: [],
    permissions: [],
    isFreshExposure: false
}
// getters 只会依赖 state 中的成员去更新
const getters = {
    // 尖头函数
    addRoutes: (state: any) => state.addRoutes,
    routes: (state: any) => state.routes,
    permissions: (state: any) => state.permissions,
    addRouisFreshExposuretes: (state: any) => state.isFreshExposure
}
const actions = {
    getMenuList({ commit, state }: any) {
        commit('setRoles', [
            {
                path: '/',
                name: 'Home',
                component: () => import('@/Layout/BasicLayout.vue'),
                meta: { title: '首页' },
                children: [
                    {
                        path: '/home',
                        name: 'index',
                        redirect: '/home/stree',
                        component: () => import('@/views/home.vue'),
                        meta: { title: '二级' },
                        children: [
                            {
                                path: '/home/stree',
                                name: 'stree',
                                component: () => import('@/views/login.vue'),
                                meta: { title: '三级' }
                            },
                            {
                                path: '/home/four',
                                name: 'four',
                                component: () => import('@/views/login.vue'),
                                meta: { title: '三级' }
                            },
                        ]
                    },
                    {
                        path: '/home/list',
                        name: 'test12',
                        component: () => import('@/views/login.vue'),
                        meta: { title: '订单' }
                    },
                ]
            },
            {
                path: '/order',
                redirect: '/order/list',
                name: 'Order',
                component: () => import('@/Layout/BasicLayout.vue'),
                meta: { title: '详情' },
                children: [
                    {
                        path: '/order/list',
                        name: 'test',
                        component: () => import('@/views/login.vue'),
                        meta: { title: '详情' }
                    },
                ]
            }
        ])
    }
}
// 修改状态
const mutations = {
    // Vuex提供了commit方法来修改状态 使用时 $store.commit('handleUserName',name)
    setRoles(state: any, payload: any) {
        state.addRoutes = payload
        state.routes = [...baseRouter, ...payload]
        // console.log(`state.routes`, state.routes)
    },
    setPermissions(state: any, payload: any) {
        state.permissions = payload
    },
    setFreshExposure(state: any, payload: any) {
        state.isFreshExposure = payload
    },
}

// 使用VUEx 存储
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}