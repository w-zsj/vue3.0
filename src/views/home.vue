<template>
  <div class="home">
    <el-button @click="goto">跳转</el-button>
    <el-table :data="tableData">
      <el-table-column prop="date" label="日期" width="140"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts">
import { log } from "console";
import { defineComponent, getCurrentInstance, reactive, toRefs } from "vue";
import { useRouter, useRoute } from "vue-router";
// import { testMock } from "@/api/base";
export default defineComponent({
  name: "Index",
  setup(props: any) {
    const router = useRouter();
    const _ = getCurrentInstance() as any;
    const { proxy } = getCurrentInstance();
    console.log("proxy??? ", _,proxy);

    let d: any = reactive({
      tableData: [],
    });
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄",
    };

    d.tableData = Array(20).fill(item);
    const goto = () => {
      // testMock(123).then((res) => {
      // console.log(`mock--->>`, res);
      // router.push({ path: "/demo" });
      window.location.href = "http://localhost:15010/home/four/list?c=14";
      // });
    };
    return {
      goto,
      ...toRefs(d),
    };
  },
});
</script>
<style scoped lang="scss"></style>
