<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <router-view />

    <div class="go-app-hint" id="goAppHint">
      <img src="@/assets/img/open-hint.png" alt />
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
export default {
  name: "App",
  components: {},
  setup() {
    onMounted(() => {
      (function (win, doc) {
        if (!win.addEventListener) return;
        var html = doc.documentElement;

        function setFont() {
          var cW = html.clientWidth;
          cW = cW > 750 ? 750 : cW < 320 ? 320 : cW;
          html.style.fontSize = 100 * (cW / 750) + "px";
        }
        win.addEventListener("resize", setFont, false);
        setFont();
      })(window, document);

      if (ENV.ios) {
        let meta = document.createElement("meta");
        meta.name = "apple-itunes-app";
        meta.content = "app-id=962223967, app-argument=";
        document.head.appendChild(meta);
      }
    });
  },
};
</script>
<style lang='scss'>
@import "./assets/css/app.scss";
</style>
