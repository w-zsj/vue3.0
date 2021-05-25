<template>
  <div>
    <!-- :uniqueOpened="true" -->
    <el-menu :defaultActive='defaultActive' class="el-menu-vertical-demo" :default-openeds="defaultOpeneds" router @select="select"  background-color="#545c64" text-color="#fff" active-text-color="#fff">
      <template v-for="(item,idx) in addRoutes" :key='idx'>
        <el-submenu :data-url='item.path' v-if="item.hasOwnProperty('children') &&  item.children.length>0" :key="item.path" :index="item.path">
          <template #title style="padding-left:10px">
            <i class="el-icon-menu"></i>
            <span>{{ item.meta.title}}</span>
          </template>
          <!--  如果有子级数据使用递归组件 -->
          <SubMenu :addRoutes="item.children"></SubMenu>
        </el-submenu>
        <el-menu-item :index="item.path" v-else>{{item.meta.title}}</el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, computed } from "vue";
import router from "../router";
import { useStore } from "vuex";
export default defineComponent({
  props: ["addRoutes"],
  name: "SubMenu",
  setup(props) {
    let defaultOpeneds: any[] = reactive([]);
    let defaultActive = ref("");
    defaultActive.value = router.currentRoute.value.path;

    const store = useStore();
    const _router: any = computed(() => store.state.base.staticRoutes);
    getOpeneds(_router.value, []);

    const select = (key: any) => {
      defaultActive.value = key;
      getOpeneds(_router.value, []);
      console.log(`defaultOpeneds`, defaultActive.value, defaultOpeneds);
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

    return { select, defaultActive, defaultOpeneds };
  },
});
</script>
<style lang="scss" scoped>
:deep .el-menu {
  border-right: 0 !important;
  .is-opened {
    .el-submenu__title {
      background: yellowgreen !important;
    }
    .el-menu--inline {
      .el-submenu__title {
        background: none !important;
      }
    }
    .is-active {
      color: peru !important;
    }
  }
  .is-active {
    color: #fff !important;
  }
}

:deep .el-submenu__title:hover {
  background: yellowgreen !important;
}
:deep .el-menu-item:hover {
  background: none !important;
}
</style>