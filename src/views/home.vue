<template>
  <div class="tit">
    {{ title }}
  </div>
</template>
<script>
import { getCurrentInstance, ref, onMounted } from "vue";
export default {
  name: "home",
  setup() {
    const instance = getCurrentInstance();
    const { ctx } = instance;
    let title = ref("首页");
    let btn = () => {
      console.log("当前实例", instance);
    };
    onMounted(() => {});
    return { title, btn };
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