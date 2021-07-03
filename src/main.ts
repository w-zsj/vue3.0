import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import store from './store/index'
import setupVant from './vantComps'
// import 'vant/lib/index.css';
const app = createApp(App, { title: "app" })
app.use(router)
app.use(store)
setupVant(app)

app.config.globalProperties.$http = 'test';

router.isReady().then(() => {
    app.mount("#app");
});
