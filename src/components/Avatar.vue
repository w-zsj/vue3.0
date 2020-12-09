<template>
  <div class="avatar flex-center">
    <img v-if="img" :src="img" alt @load="load" :style="style" />
    <img
      v-else
      src="@/assets/img/image-head.png"
      @load="load"
      :style="style"
      alt
    />
  </div>
</template>
<script>
export default {
  name: "Avatar",
  props: {
    img: {
      type: String,
    },
  },
  data() {
    return {
      style: {},
    };
  },
  methods: {
    load(e) {
      let img = e.target || e.path[0];
      let { naturalHeight: H, naturalWidth: W } = img || {};
      if (W / H > 1) this.style = { height: "100%", width: "auto" };
      else this.style = { width: "100%", height: "auto" };
    },
  },
};
</script>
<style lang="scss">
.avatar {
  $size: 32 * $px;
  width: $size;
  height: $size;
  border-radius: 100%;
  overflow: hidden;
}
</style>
