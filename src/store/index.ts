import { createStore } from 'vuex'
import base from './modules/base'
import user from './modules/user'
// 使用VUEx 存储
export default createStore({
    // 模块化vuex，可以让每一个模块拥有自己的state、mutation、action、getters
    modules: {
        base, user
    }
})