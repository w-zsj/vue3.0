<template>
  <el-container>
    <el-aside width="200px">
      <el-scrollbar height="100vh">
        <el-menu :defaultActive="defaultActive" :defaultOpeneds='defaultOpeneds' :uniqueOpened="true" @select='select' router background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <SiderMenu :addRoutes='addRoutes' v-if="addRoutes?.length"></SiderMenu>
        </el-menu>
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
import { defineComponent, computed, reactive, ref } from "vue";
import Breadcrumb from "./Breadcrumb.vue";
import SiderMenu from "./SiderMenu.vue";
import { useStore } from "vuex";
import router from "../router";

export default defineComponent({
  components: { Breadcrumb, SiderMenu },
  setup() {
    let defaultOpeneds: any[] = reactive([]);
    let defaultActive = ref("");

    const store = useStore();
    // 处理菜单数据
    const addRoutes = computed(() => {
      let router = store.state.base.addRoutes;
      function delHiddenRouter(r: any[]) {
        let newRouter: any = [];
        if (r?.length)
          r.forEach((item: any) => {
            if (!item.hidden) {
              const newItem = { ...item };
              delete newItem.children;
              if (
                item.children &&
                !item.children.every((item: any) => item.hidden)
              ) {
                let childrenArr = delHiddenRouter(item.children);
                if (childrenArr?.length > 0) {
                  newItem.children = childrenArr;
                }
              } else delHiddenRouter(item.children);
              newRouter.push(newItem);
            }
          });
        // console.log(`newRouter-->>`, newRouter);
        router = newRouter;
        return newRouter;
      }
      delHiddenRouter(router);
      return router;
    });

    //↓↓↓↓↓↓↓↓↓↓ 处理openkey
    defaultActive.value = router.currentRoute.value.path;
    // 页面刷新 展开默认菜单
    const _router: any = computed(() => store.state.base.staticRoutes);
    getOpeneds(_router.value, []);

    const select = (key: any) => {
      defaultActive.value = key;
      // getOpeneds(_router.value, []);
    };

    function getOpeneds(router: any[], parent: string[]) {
      router.forEach((item) => {
        if (item.path == defaultActive.value) {
          if (item.hidden) defaultActive.value = parent[parent.length - 1];
          defaultOpeneds = [...parent, item.path];
        } else if (item?.children?.length && item?.path) {
          getOpeneds(item.children, [...parent, item.path]);
        }
      });
    }
    //↑↑↑↑↑↑↑↑↑↑ 处理openkey
    return {
      addRoutes,
      select,
      defaultActive,
      defaultOpeneds,
    };
  },
});
</script>
<style scoped lang='scss'>
.el-header {
  background-color: #b3c0d1;
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
.el-menu {
  border-right: 0;
}
.el-menu :deep(.el-submenu__title) {
  height: 44px;
  line-height: 44px;
}
:deep(.el-submenu.is-active .el-submenu__title) {
  background: yellowgreen !important;
}

:deep(.el-menu--inline .el-submenu.is-active .el-submenu__title) {
  background: none !important;
}
:deep(.el-submenu__title:hover) {
  background: yellowgreen !important;
}
:deep(.el-menu-item:hover) {
  background: none !important;
}
</style>

