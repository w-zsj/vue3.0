<template>
  <keep-alive :include="keepAliveWhiteList">
    <router-view></router-view>
  </keep-alive>
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
