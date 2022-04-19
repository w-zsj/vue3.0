<template>
  <div class="home">
    <van-list finished-text="没有更多了">
      <van-cell>12</van-cell>
      <van-cell>12</van-cell>
      <van-cell>12</van-cell>
    </van-list>
    <van-checkbox-group v-model="checked" direction="horizontal">
      <van-checkbox name="a">复选框 a</van-checkbox>
      <van-checkbox name="b">复选框 b</van-checkbox>
    </van-checkbox-group>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Index",
  setup(props) {
    console.log("props--->>>", props);
    return {};
  },
});
</script>
<style scoped lang="scss">
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>
