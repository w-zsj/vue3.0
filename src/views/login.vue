<template>
  <swiper :options="swiperOption2" direction='vertical' @swiper="onSwiper" @slideChange="onSlideChange">
    <swiper-slide>Slide 1</swiper-slide>
    <swiper-slide>Slide 2</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
    <swiper-slide>Slide 4</swiper-slide>
    <swiper-slide>Slide 5</swiper-slide>
    <swiper-slide>Slide 1</swiper-slide>
    <swiper-slide>Slide 2</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
    <swiper-slide>Slide 4</swiper-slide>
    <swiper-slide>Slide 5</swiper-slide>
    <swiper-slide>Slide 1</swiper-slide>
    <swiper-slide>Slide 2</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
    <swiper-slide>Slide 4</swiper-slide>
    <swiper-slide>Slide 5</swiper-slide>
  </swiper>

</template>
<script lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { defineComponent, reactive, ref } from "vue";
import { useRouter, useRoute, RouterLink } from "vue-router";
import { useStore } from "vuex";

import Footer from "comps/footer.vue";
export default defineComponent({
  name: "Index",
  components: { Footer, Swiper, SwiperSlide },
  setup(props) {
    const swiperOption2 = reactive({
      direction: "vertical",
      loop: true,
      autoplay: 1000,
    });
    const onSwiper = (swiper: any) => {
      console.log("23", swiper);
    };
    const onSlideChange = () => {
      console.log("slide change");
    };

    return {
      onSwiper,
      onSlideChange,
      swiperOption2,
    };
  },
});
</script>
<style lang='scss'>
::-webkit-scrollbar,
::-webkit-scrollbar-button,
::-webkit-scrollbar-track,
::-webkit-scrollbar-track-piece,
::-webkit-scrollbar-thumb,
::-webkit-scrollbar-corner,
::-webkit-resizer {
  background: red;
}
.home {
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
}
</style>