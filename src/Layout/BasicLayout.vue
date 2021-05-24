<template>
  <el-container>
    <el-aside width="200px">
      <el-scrollbar height="100vh">
        <SiderMenu :addRoutes='addRoutes'></SiderMenu>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header>
        <Breadcrumb />
      </el-header>
      <el-main>
        <el-scrollbar height="80vh">
          <router-view></router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import Breadcrumb from "./Breadcrumb.vue";
import SiderMenu from "./SiderMenu.vue";
import { useStore } from "vuex";
export default defineComponent({
  components: { Breadcrumb, SiderMenu },
  setup() {
    const store = useStore();
    let addRoutes = computed(() => store.state.base.addRoutes);
    return {
      addRoutes,
    };
  },
});
</script>
<style scoped lang='scss'>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #545c64;
  text-align: center;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>

