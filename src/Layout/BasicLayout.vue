<template>
  <el-container>
    <el-aside width="200px">
      <el-scrollbar height="100vh">
        <SiderMenu></SiderMenu>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header>
        <Breadcrumb />
      </el-header>
      <el-main>
        <router-view></router-view>
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
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
  // min-height: 100vh;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
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

