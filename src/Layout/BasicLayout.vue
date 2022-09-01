<template>
  <el-container>
    <el-aside>
      <div class="admin-name flex-center">电商管理后台</div>
      <el-scrollbar>
        <SiderMenu />
      </el-scrollbar>
    </el-aside>
    <el-container>
      <div class="user-info flex-end">admin</div>
      <el-header>
        <Breadcrumb />
      </el-header>
      <el-main>
        <el-scrollbar>
          <router-view></router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Breadcrumb from "./Breadcrumb.vue";
import SiderMenu from "./SiderMenu.vue";

export default defineComponent({
  name: "BasicLayout",
  components: { Breadcrumb, SiderMenu },
  setup() {},
});
</script>
<style scoped lang="scss">
.admin-name {
  height: 80px;
  color: #fff;
  position: sticky;
  top: 0;
  z-index: 9;
}
.user-info {
  height: 80px;
  padding-right: 40px;
}
.el-header {
  background-color: #f9f9f9;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #1f2d3d;
  max-width: 200px;
  .el-scrollbar {
    height: calc(100vh - 80px);
  }
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  height: calc(100vh - 60px - 80px);
  // overflow: hidden;
}
body > .el-container {
  margin-bottom: 40px;
}
</style>
