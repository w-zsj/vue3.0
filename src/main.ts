import { createApp } from 'vue'
import App from './App.vue'
// import VConsole from 'vconsole';
import setupElComponent from './utils/ElComponent'
import router from "./router"
import store from './store/index'
import svgIcon from './components/svgIcon.vue'
import hasPermission from './directive/hasPermission'
// import 'element-plus/lib/theme-chalk/index.css';
import '../mock'
import 'fullpage.js/vendors/scrolloverflow';
import VueFullPage from 'vue-fullpage.js';

console.log(`process.env>>>`, import.meta.env.DEV)

// const vConsole = new VConsole();
// if (!import.meta.env.DEV) {
//     vConsole.destroy();
// }

const app = createApp(App, { title: "app" })
setupElComponent(app)
app
    .use(router)
    .use(store)
    .use(VueFullPage);
app.component('svg-icon', svgIcon)

app.directive('hasPermission', hasPermission)
app.config.globalProperties.$http = 'test';

router.isReady().then(() => {
    app.mount("#app");
});
