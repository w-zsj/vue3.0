<template>
  <div class="home">
    <el-button @click="goto">查看详情</el-button>
    <el-table :data="tableData">
      <el-table-column prop="date" label="日期" width="140"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { useRouter, useRoute } from "vue-router";
export default defineComponent({
  name: "Index",
  setup(props: any) {
    const router = useRouter();
    let _: any = reactive({
      tableData: [],
    });
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄",
    };

    _.tableData = Array(20).fill(item);
    const goto = () => {
      router.push({ path: "/home/four/list/detail" });
    };
    return {
      goto,
      ...toRefs(_),
    };
  },
});
</script>
<style scoped lang="scss"></style>
