<template>
  <template v-for="(item,idx) in addRoutes" :key="idx+Math.random()">
    <el-submenu v-if="item?.children?.length>0" :index="item.path">
      <template #title style="padding-left:10px">
        <svg-icon :name="(firstKey==item.path&&item?.meta?.actIcon || item?.meta?.icon||'') "></svg-icon>
        <span style="paddingLeft:4px;">{{ item.meta.title}}</span>
      </template>
      <!--  如果有子级数据使用递归组件 -->
      <SubMenu :addRoutes="item.children"></SubMenu>
    </el-submenu>
    <el-menu-item :index="item.path" v-else :class="item.meta.icon?'one-menu':''">
      <template #title>
        <svg-icon :name="(defaultActive==item.path&&item?.meta?.actIcon || item?.meta?.icon||'') "></svg-icon>
        {{item.meta.title}}
      </template>
    </el-menu-item>
  </template>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: ["addRoutes", "defaultActive", "firstKey"],
  name: "SubMenu",
});
</script>