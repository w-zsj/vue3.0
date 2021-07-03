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
    <!-- 首页 -->
    <!-- <van-button type="primary" @click="_click">主要按钮</van-button> -->
    <van-swipe class="my-swipe"  indicator-color="white" vertical>
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>

    <!-- <Footer msg='' @callback='callback'></Footer>
    <div class="img line">
      <img src='../assets/img/empty.png' />
      <img src="../assets/img/form_temp.png" alt="">
    </div>
    <Button>按钮</Button> -->
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onBeforeUpdate,
  onMounted,
  reactive,
  ref,
  toRef,
  getCurrentInstance,
  toRefs,
  computed,
} from "vue";
import { useRouter, useRoute, RouterLink } from "vue-router";
import { useStore } from "vuex";
import Footer from "comps/footer.vue";
import { Toast } from "vant";
export default defineComponent({
  name: "Index",
  components: { Footer },
  setup(props) {
    const _ = getCurrentInstance() as any;
    console.log("props--->>>", _.ctx.$http);

    const router = useRouter();
    const route = useRoute();
    let test = reactive({
      a: 1,
      b: {
        c: 2,
      },
    });
    let d = toRef(test, "a");
    d.value = 1234;
    let realTime = reactive({ count: 0 });
    function handleclick() {
      router.push({ path: "/other" });
    }
    const callback = (val: string) => {
      // console.log("val--", val);
    };

    const list = reactive([1, 2, 3]);
    const divs = ref([]);

    const store = useStore();
    let user = computed(() => store.state.user);
    console.log("store--", user.value);
    const _click = (index: number) => {
      Toast("当前 Swipe 索引：" + index);
    };
    const checked = ref([]);

    return {
      ...toRefs(test),
      realTime,
      handleclick,
      callback,
      _click,
      checked,
    };
  },
});
</script>
<style scoped lang='scss'>
 .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
</style>