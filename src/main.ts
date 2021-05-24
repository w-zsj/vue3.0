import { createApp } from 'vue'
import App from './App.vue'
import setupElComponent from './utils/ElComponent'
import router from "./router"
import store from './store/index'

const app = createApp(App, { title: "app" })
setupElComponent(app)
app
    .use(router)
    .use(store)
app.config.globalProperties.$http = 'test';

router.isReady().then(() => {
    app.mount("#app");
});
