import { createApp } from 'vue'
import App from './App.vue'
import cops from './utils/ElComponent'
import router from "./router"
import store from './store/index'
import lang from 'element-plus/lib/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale'
import ElementPlus from 'element-plus'
locale.use(lang)

const app = createApp(App, { title: "app" })
cops(app)
app.use(ElementPlus)
app
    .use(router)
    .use(store)
app.config.globalProperties.$http = 'test';

router.isReady().then(() => {
    app.mount("#app");
});
