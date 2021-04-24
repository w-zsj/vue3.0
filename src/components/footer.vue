<template>
  {{msg}}
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";
export default defineComponent({
  name: "Footer",
  emits: ["callback"],
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
  setup: (props, { emit }) => {
    // console.log("router--", props);
    emit("callback", "zsj");
  },
});
</script>

<style scoped>
</style>
