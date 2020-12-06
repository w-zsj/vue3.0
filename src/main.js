import './utils/inject'
import Mixins from './utils/mixins'
import { createApp, h } from 'vue';
import App from './App.vue'

import router from "./router"
import store from "./store"

const app = createApp({
    data() {
        return {}
    },
    render: () => h(App),
    beforeCreate() {
        // 微信环境下引入微信jssdk
        if (ENV.wx) {
            var wxJsSdk = document.createElement('script')
            wxJsSdk.id = '_wx_js_sdk'
            wxJsSdk.src = '//res.wx.qq.com/open/js/jweixin-1.2.0.js'
            document.head.appendChild(wxJsSdk)
        }
    },
    mounted() {
        let dw = window.screen.width
        let dh = window.screen.height
        this.ipx = (dw === 375 && dh === 812) || (dw === 414 && dh === 896)
    }
})
app.mixin(Mixins)
    .use(router)
    .use(store)
    .mount('#app')

export default app
