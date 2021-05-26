<template>
  <div class="flex-aic breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(item,idx) in Breadcrumb" :key="idx" :to="{path:item.path}">
        {{item.title}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name:'Breadcrumb',
  setup() {
    let store = useStore();
    let Breadcrumb = computed(() => store.getters["base/breadCrumb"]);
    return { Breadcrumb };
  },
});
</script>

<style scoped lang='scss'>
.breadcrumb {
  height: 100%;
}
</style>