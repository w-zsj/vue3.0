<template>
  <div class="sticky-go-app">
    <div class="icon-word">
      <img src="../assets/img/logo-new2.png" alt="" />
      <div class="word-comp">
        <div class="word-comp-title">SneakerBurger</div>
        <div>便捷求出货、查看鞋页曝光</div>
      </div>
    </div>
    <span class="btn" @click="go">打开APP</span>
  </div>
</template>
<script>
import { GoApp } from "@/utils/util";
export default {
  name: "StickyGoApp",
  methods: {
    // 前往app
    go() {
      this.callApp();
    },
  },
};
</script>
<style lang="scss">
.sticky-go-app {
  position: fixed;
  z-index: 89;
  @include flex(flex, space-between, center, nowrap);
  top: 0;
  left: 0;
  width: 100%;
  height: 50 * $px;
  background-color: #232323;
  padding: 0 20 * $px;
  .icon-word {
    @include flex(flex, flex-aic, center, nowrap);
    img {
      display: block;
      width: 34 * $px;
      height: 34 * $px;
      border: 2 * $px solid #fff;
      margin-right: 5 * $px;
      border-radius: 8 * $px;
    }
    .word-comp {
      font-size: 10 * $px;
      color: #999;
      &-title {
        font-size: 14 * $px;
        color: #fff;
      }
    }
  }
  .btn {
    @include flex(flex, center, center, nowrap);
    width: 76 * $px;
    height: 30 * $px;
    font-family: Arial, Helvetica, sans-serif;
    background: #fff;
    border-radius: 6 * $px;
    @include text(8 * $px, $color-block, left, 600);
  }
}
</style>
