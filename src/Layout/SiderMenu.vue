<template>
  <template v-for="(item,idx) in addRoutes" :key="idx+Math.random()">
    <el-submenu v-if="item?.children?.length>0" :index="item.path">
      <template #title style="padding-left:10px">
        <i class="el-icon-menu"></i>
        <span>{{ item.meta.title}}</span>
      </template>
      <!--  如果有子级数据使用递归组件 -->
      <SubMenu :addRoutes="item.children"></SubMenu>
    </el-submenu>
    <el-menu-item :index="item.path" v-else>{{item.meta.title}}</el-menu-item>
  </template>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: ["addRoutes"],
  name: "SubMenu",
});
</script>