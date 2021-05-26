

// 定义基本属性
const state = {
    userinfo: {
        name: 'zsj',
        age: 12
    }
}
// getters 只会依赖 state 中的成员去更新
const getters = {
    // 尖头函数
    userinfo: (state: any) => state.userinfo
}
const actions = {}
// 修改状态
const mutations = {
    // Vuex提供了commit方法来修改状态 使用时 $store.commit('handleUserName',name)
    SET_USER: (state: any, user: any) => {
        state.user = user
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