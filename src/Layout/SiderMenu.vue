<template>
  <el-menu :defaultActive="defaultActive" :defaultOpeneds='defaultOpeneds' :uniqueOpened="true" router background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
    <SubMenu :addRoutes='addRoutes' :defaultActive='defaultActive' :firstKey="firstKey" v-if="addRoutes?.length"></SubMenu>
  </el-menu>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import SubMenu from "./SubMenu.vue";
import handleRouter from "@/plugins/handleRouter";
import handleMenuOpenKey from "@/plugins/handleMenuOpenKey";
export default defineComponent({
    name:'SiderMenu',
  components: { SubMenu },
  setup() {
    // 处理菜单数据
    const addRoutes = handleRouter();
    // 处理openkey
    const { defaultActive, defaultOpeneds }: any = handleMenuOpenKey();
    const firstKey = computed(() => defaultOpeneds.value[0]);
    return {
      addRoutes,
      defaultActive,
      defaultOpeneds,
      firstKey,
    };
  },
});
</script>
<style scoped lang='scss'>
.el-menu {
  border-right: 0;
}
.el-menu :deep(.el-submenu__title),
.el-menu :deep(.el-menu-item) {
  height: 44px;
  line-height: 44px;
}

:deep(.el-submenu.is-active .el-submenu__title) {
  background: #38ce8a !important;
}

:deep(.el-menu--inline .el-submenu.is-active .el-submenu__title) {
  background: none !important;
}
:deep(.is-active.one-menu) {
  background: #38ce8a !important;
  color: #fff !important;
}
:deep(.el-submenu.is-active .el-submenu__title i),
:deep(.el-submenu__title:hover i) {
  color: #fff !important;
}
// :deep(.el-menu-item.one-menu:hover) {
//   background: #38ce8a !important;
// }
// :deep(.el-submenu__title:hover) {
//   background: #38ce8a !important;
// }
// :deep(.el-menu-item:hover),
// :deep(.el-submenu__title:hover),
// :deep(.el-menu-item.one-menu:hover) {
//   background: none !important;
// }
</style>