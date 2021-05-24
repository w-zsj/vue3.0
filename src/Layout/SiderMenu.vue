<template>
  <div>
    <el-menu :defaultActive='defaultActive' :default-openeds="defaultOpeneds" router @open='open' @select="open" :uniqueOpened="true" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <template v-for="(item,idx) in addRoutes" :key='idx'>
        <el-submenu v-if="item.hasOwnProperty('children')&&item.children.length>0" :key="item.path" :index="item.path">
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
    let _router: any = computed(() => store.state.base.routes);

    getOpeneds(_router.value, []);
    let open = (key: any) => {
      defaultActive.value = key;
      defaultOpeneds = [];
      getOpeneds(_router.value, []);
    };

    function getOpeneds(router: any[], parent: string[]) {
      router.forEach((item) => {
        if (item.path == defaultActive.value) {
          defaultOpeneds = [...parent, item.path];
        } else if (item?.children?.length) {
          getOpeneds(item.children, [...parent, item.path]);
        }
      });
    }

    return { open, defaultActive, defaultOpeneds };
  },
});
</script>
<style lang="scss" scoped>
.el-menu {
  border-right: 0 !important;
}
</style>