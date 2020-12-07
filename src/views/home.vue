<template>
  <div @click="toHome">
    <div class="tit">
      <!-- {{ title }} -->
    </div>
    <van-button type="primary">主要按钮</van-button>
    <empty></empty>
    <!-- <GoAppBtn ></GoAppBtn> -->
  </div>
</template>
<script>
import { getCurrentInstance, ref, onMounted, provide } from "vue";
import { Toast } from 'vant';
import GoAppBtn from "comps/GoAppBtn";
export default {
  name: "home",
  components: {
    GoAppBtn,
  },
  setup(props, context) {
    const instance = getCurrentInstance();
    const {
      ctx,
      ctx: { $router },
    } = instance;
    let title = ref("首页 不是承接页");
    let toHome = () => {
      console.log("当前实例", instance);
      $router.push("/about/privacy");
    };

    onMounted(() => {});
    const location = ref("打开嗜鞋APP查看更多内容");
    const title_changed = (val) => {
      // console.log("emit--", val);
    };
    Toast('toast')
    provide("txt", location);
    return { title, toHome, title_changed };
  },
};
</script>
<style scoped lang="scss">
.tit {
  font-size: 40 * $px;
  // width: 50 * $px;
  // height: 50 * $px;
  // background: yellowgreen;
  margin: 100px auto;
  color: #000;
  font-weight: bold;;
  @include flex(flex, center, center);
}
</style>