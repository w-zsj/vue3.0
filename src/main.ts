import { createApp, h } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import svgIcon from "./components/svgIcon.vue";
import hasPermission from "./directive/hasPermission";
import "../mock";
import "fullpage.js/vendors/scrolloverflow";
import VueFullPage from "vue-fullpage.js";
import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import "element-plus/dist/index.css";
const app = createApp(App);
app.use(router).use(store).use(VueFullPage);
app.use(ElementPlus, {
  locale: zhCn,
});
app.component("svg-icon", svgIcon);

app.directive("hasPermission", hasPermission);
app.config.globalProperties.$http = "test";

router.isReady().then(() => {
  app.mount("#app");
});
