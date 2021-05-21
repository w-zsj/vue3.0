<template>
  <div class="home">
    <el-button type='primary'>首页</el-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
export default defineComponent({
  name: "Index",
  setup(props) {
    const _ = getCurrentInstance() as any;
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    return {};
  },
});
</script>
<style scoped lang='scss'>
.home {
}
</style>