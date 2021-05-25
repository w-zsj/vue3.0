import { createApp } from 'vue'
import App from './App.vue'
import setupElComponent from './utils/ElComponent'
import router from "./router"
import store from './store/index'
import svgIcon from './components/svgIcon.vue'

const app = createApp(App, { title: "app" })
setupElComponent(app)
app
    .use(router)
    .use(store)
app.component('svg-icon', svgIcon)
app.config.globalProperties.$http = 'test';

router.isReady().then(() => {
    app.mount("#app");
});
