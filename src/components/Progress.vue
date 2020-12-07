<template>
  <div class="progress-container" :style="{width: progressWidth+'%'}"></div>
</template>
<script>
import Bus from '@/utils/bus'
export default {
  props: ['loadingComplete'],
  data () {
    return {
      progressWidth: 0
    }
  },
  created () {
    this.loadProgress()
  },
  methods: {
    loadProgress () {
      this.timer = setInterval(() => {
        if (this.progressWidth < 60) {
          this.progressWidth = this.progressWidth + 60
        } else {
          this.progressWidth = 90
        }
      }, 200)
      Bus.$on('loadingComplete', res => {
        if (res) {
          this.progressWidth = 100
          clearInterval(this.timer)
          setTimeout(() => {
            Bus.$emit('routerProgress', false)
          }, 200)
        }
      })
    }
  }
}
</script>
<style scoped>
  .progress-container {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999999;
    width: 100vw;
    height: 2px;
    background: #ffc700;
    transition: all 0.1s linear;
  }
</style>
