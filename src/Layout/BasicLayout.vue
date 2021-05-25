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

    return {
      addRoutes,
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

// .el-container:nth-child(5) .el-aside,
// .el-container:nth-child(6) .el-aside {
//   line-height: 260px;
// }

// .el-container:nth-child(7) .el-aside {
//   line-height: 320px;
// }
</style>

