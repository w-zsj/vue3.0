<template>
  <el-menu :defaultActive="defaultActive" :defaultOpeneds='defaultOpeneds' :uniqueOpened="true" router
    background-color="#1f2d3d" text-color="rgb(191, 203, 217)" active-text-color="rgb(64, 158, 255)">
    <SubMenu :addRoutes='addRoutes' :defaultActive='defaultActive' :firstKey="firstKey" v-if="addRoutes?.length">
    </SubMenu>
  </el-menu>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import SubMenu from "./SubMenu.vue";
import handleRouter from "@/plugins/handleRouter";
import handleMenuOpenKey from "@/plugins/handleMenuOpenKey";
export default defineComponent({
  name: "SiderMenu",
  components: { SubMenu },
  setup() {
    // 处理菜单数据
    const addRoutes = handleRouter();
    // 处理openkey
    const { defaultActive, defaultOpeneds } = handleMenuOpenKey();
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
:deep(.svg-icon) {
  margin-right: 6px;
}
.el-menu {
  border-right: 0;
}
.el-menu :deep(.el-sub-menu__title),
.el-menu :deep(.el-menu-item) {
  height: 44px;
  line-height: 44px;
}
:deep(.el-sub-menu__title) {
  background: rgb(48, 65, 86) !important;
}

:deep(.el-sub-menu__title:hover) {
  background: #1f2d3d !important;
}
:deep(.el-menu-item) {
  background: rgb(48, 65, 86) !important;
}
:deep(.one-menu .el-menu-item) {
  background: #1f2d3d !important;
}
</style>