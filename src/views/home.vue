<template>
  <div>{{ title }}</div>
</template>
<script>
import { getCurrentInstance, ref, onMounted } from "vue";
export default {
  name: "home",
  setup() {
    let title = ref("首页");
    onMounted(() => {
      const instance = getCurrentInstance();
    });
    return { title };
  },
};
</script>