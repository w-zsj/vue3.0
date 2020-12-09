<template>
  <div class="goApp padding-15">
    <p @click="goapp" class="fontBold flex-center">
      {{ txt }}
    </p>
  </div>
</template>
<script>
import { getCurrentInstance, inject } from "vue";
export default {
  props: {
    txt: {
      type: String,
      default: "打开嗜鞋APP查看更多内容",
    },
  },
  setup(props, context) {
    const { ctx } = getCurrentInstance();
    const goapp = () => ctx.callApp();
    return { goapp };
  },
};
</script>
<style lang="scss" scoped>
.goApp {
  p {
    width: 345 * $px;
    height: 50 * $px;
    background: #000;
    border-radius: 6 * $px;
    margin: 0 auto;
    color: #fff;
    font-size: 16 * $px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    .ico-more-black {
      margin-left: 6 * $px;
    }
  }
}
</style>
