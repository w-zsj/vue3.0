import './utils/inject'
import Mixins from './utils/mixins'
import { createApp, h } from 'vue';
import App from './App.vue'

import router from "./router"
import store from "./store"

import Vant from 'vant';
import { Toast } from 'vant';
import { Popup } from 'vant';

import ico from './components/base/ico'
import Empty from './components/base/Empty'

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
app.config.globalProperties.$filters = {
    NumFormat(val) {
        return val < 0 ? 0 : parseFloat(val).toFixed(2);
    },
    floatPercent: function (val) {
        return val < 0 ? 0 : parseFloat((val * 100)).toFixed(2);
    },
    techRateFormat: function (val) {
        return val < 0 ? 0 : parseFloat((val * 100)).toFixed(2);
    },
    formateSize: function (val) {
        let temSize = "";
        if (val && val.length > 0) {
            val.forEach((item) => {
                temSize += item.size + ",";
            });
            temSize = temSize.substring(0, temSize.lastIndexOf(","));
            return temSize;
        } else {
            return "";
        }
    }
}
app.component('ico', ico)
app.component('empty', Empty)
app.mixin(Mixins)
    .use(router)
    .use(store)
    .use(Vant)
    .use(Toast)
    .use(Popup)
    .mount('#app')

export default app
