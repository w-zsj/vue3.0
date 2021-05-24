import { createApp } from 'vue'
import App from './App.vue'
import cops from './utils/ElComponent'
import 'element-plus/lib/theme-chalk/index.css';
import router from "./router"
import store from './store/index'
import lang from 'element-plus/lib/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale'
locale.use(lang)

const app = createApp(App, { title: "app" })
cops(app)

app
    .use(router)
    .use(store)
app.config.globalProperties.$http = 'test';

router.isReady().then(() => {
    app.mount("#app");
});
