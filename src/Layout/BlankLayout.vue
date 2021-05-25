<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="keepAliveWhiteList">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
<script lang="ts">
import keepAliveWhiteList from "../router/constant";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return { keepAliveWhiteList };
  },
});
</script>
