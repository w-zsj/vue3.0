<template>
  <div class="tit" @click="toHome">
    {{ title }}
  </div>
</template>
<script>
import { getCurrentInstance, ref, onMounted } from "vue";
export default {
  name: "home",
  setup() {
    const instance = getCurrentInstance();
    const {
      ctx,
      ctx: { $router },
    } = instance;
    let title = ref("首页");
    let toHome = () => {
      console.log("当前实例", instance);
      $router.push("/about/privacy");
    };
    onMounted(() => {});
    return { title, toHome };
  },
};
</script>
<style scoped lang="scss">
.tit {
  font-size: 16 * $px;
  width: 50 * $px;
  height: 50 * $px;
  background: yellowgreen;
  color: #fff;
  @include flex(flex, center, center);
}
</style>