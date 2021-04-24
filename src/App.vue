<template>
  <div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "App",
  props:['title'],
  setup(props) {
    console.log("props", props);
  },
});
</script>
