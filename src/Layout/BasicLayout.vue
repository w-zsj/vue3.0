<template>
  <el-container>
    <el-aside width="200px">
      <el-scrollbar height="100vh">
        <SiderMenu />
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
import { defineComponent } from "vue";
import Breadcrumb from "./Breadcrumb.vue";
import SiderMenu from "./SiderMenu.vue";

export default defineComponent({
  components: { Breadcrumb, SiderMenu },
  setup() {},
});
</script>
<style scoped lang='scss'>
.el-header {
  background-color: #f9f9f9;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #545c64;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>

