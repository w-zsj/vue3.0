<template>
  <div class="data-empty txt-center">
    <img src="@/assets/img/empty.png" alt />
    <!-- <p>数据加载失败~</p> -->
    <p>
      <slot></slot>
    </p>
    <GoAppBtn txt="「打开嗜鞋APP查看更多鞋圈内幕」"></GoAppBtn>
  </div>
</template>
<script>
import GoAppBtn from "comps/GoAppBtn";
export default {
  components: { GoAppBtn },
};
</script>
<style lang="scss">
.data-empty {
  img {
    width: 80%;
    margin: 24% auto 0;
  }
  p {
    margin: 20 * $px 0;
    color: $color-9;
  }
  button {
    background: $color-3;
    color: #fff;
    border-radius: 6 * $px;
  }
}
</style>
