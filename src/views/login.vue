<template>
  <div class="home">首页
    <el-button v-hasPermission="['home:btn']">默认按钮</el-button>
    <Footer msg='' @callback='callback'></Footer>
    <div class="img line">
      <img src='../assets/img/empty.png' />
      <img src="../assets/img/form_temp.png" alt="">
    </div>
    <button>按钮</button>
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
    let user = computed(() => store.getters["user/userinfo"]);
    console.log(`userinfo--->>>`, user, store.getters["user/userinfo"]);
    return {
      ...toRefs(test),
      realTime,
      handleclick,
      callback,
    };
  },
});
</script>
<style scoped lang='scss'>
.home {
  bottom {
    font-size: 12px;
  }
  .img {
    img {
      display: block;
      width: 100%;
    }
  }
}
</style>